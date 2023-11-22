import User from "../models/user-model.js";
import { ProfileSettings } from "../models/profile-settings-model.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import httpError from "../helpers/HttpError.js";
import sendEmail from "../helpers/sendEmail.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import gravatar from 'gravatar';
import fs from 'fs/promises';
import Jimp from 'jimp';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import { nanoid } from "nanoid";

const { JWT_SECRET, BASE_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUNDINARY_API_SECRET } = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUNDINARY_API_SECRET,
})

const registration = async (req, res) => {
    const { email, password } = req.body;
    if (user) throw httpError(409, "Email in use");
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();
    const user = await User.findOne({ email });
    const avatarURL = gravatar.url(email)

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = {
        to: email,
        subject: 'Power Pulse Team <Verify Email request>',
        html: `<a target="_blank" href="https://turboboyd.github.io/PowerPulser/verify/${verificationToken}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            email: newUser.email,
            name: newUser.name,
            registrDate: newUser.createdAt,
            avatarURL: newUser.avatarURL,
            verify: newUser.verify,
        },
    });
}

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) throw httpError(404, 'User not found');
    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    const settings = await ProfileSettings.findOne({ owner: user.id }, "-_id -createdAt -updatedAt -owner");

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null, token: token });
    res.json({
        user: {
            name: user.name,
            email: user.email,
            verifyToken: user.verify,
            registrDate: user.createdAt,
            avatarURL: user.avatarURL,
            profileSettings: settings,
        },
        token: token
    })
}

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw httpError(404, 'User not found');
    if (user.verify) throw httpError(400, 'Verification has already been passed');

    const verifyEmail = {
        to: email,
        subject: 'Power Pulse Team <Verify Email request>',
        html: `<a target="_blank" href="https://turboboyd.github.io/PowerPulser/api/users/verify/${user.verificationToken}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: 'Verification email sent'
    })
}

const changePasswordSendMail = async (req, res) => {
    const { email } = req.body;
    const verificationToken = nanoid();
    const findUser = await User.findOneAndUpdate({ email }, { verify: false, verificationToken: verificationToken, token: '' });
    if (!findUser) throw httpError(404, 'User not found')

    const verifyEmail = {
        to: email,
        subject: 'Power Pulse Team <Change password request>',
        html: `<a target="_blank" href="https://turboboyd.github.io/PowerPulser/password/${verificationToken}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: 'Verification link has been sent on your Email, please check it.'
    })
}

const changePassword = async (req, res) => {
    const { verificationToken } = req.params;
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const findUser = await User.findOne({ verificationToken });
    
    if(!findUser) throw httpError(404, 'User not found');

    await User.findOneAndUpdate(findUser._id, {verify: true, verificationToken: null, password: hashPassword})

    res.json({
        message: "Password has been changed, please logged in with new password."
    })

}

const authorization = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw httpError(401, "Email or password invalid");
    const settings = await ProfileSettings.findOne({ owner: user.id }, "-_id -createdAt -updatedAt -owner");
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw httpError(401, "Email or password invalid");
    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    if (!user.verify) throw httpError(401, 'Email not verify');

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        user: {
            email: user.email,
            name: user.name,
            registrDate: user.createdAt,
            avatarURL: user.avatarURL,
            profileSettings: settings
        },
        token: token,
    });
}

const getCurrent = async (req, res) => {
    const { email, name, token, id, createdAt, avatarURL } = req.user;
    const settings = await ProfileSettings.findOne({ owner: id }, "-_id -createdAt -updatedAt -owner");
    res.json({
        user: {
            email: email,
            name: name,
            registrDate: createdAt,
            avatarURL: avatarURL,
            profileSettings: settings,
        },
        token: token,
    })
}

const logOut = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.status(204).json({
        message: "Logout success"
    })
}

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: avatarTempPath } = req.file;

    try {
        const result = await cloudinary.uploader.upload(avatarTempPath);
        await fs.unlink(avatarTempPath);
        await User.findByIdAndUpdate(_id, { avatarURL: result.secure_url })

        res.json({
            avatarURL: result.secure_url,
        });
    }
    catch (error) {
        console.error('error loading avatar:', error);
        res.status(500).json({ error: 'error loading avatar:' });
    }
};

export default {
    registration: ctrlWrapper(registration),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    changePasswordSendMail: ctrlWrapper(changePasswordSendMail),
    changePassword: ctrlWrapper(changePassword),
    authorization: ctrlWrapper(authorization),
    logOut: ctrlWrapper(logOut),
    getCurrent: ctrlWrapper(getCurrent),
    updateAvatar: ctrlWrapper(updateAvatar),
}