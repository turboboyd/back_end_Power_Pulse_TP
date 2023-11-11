import User from "../models/user-model.js";
import { ProfileSettings } from "../models/profile-settings-model.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import httpError from "../helpers/HttpError.js";
import sendEmail from "../helpers/sendEmail.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { nanoid } from "nanoid";

const { JWT_SECRET, BASE_URL } = process.env;

const registration = async (req, res) => {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const user = await User.findOne({ email });
    if (user) throw httpError(409, "Email in use");

    const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken });

    const verifyEmail = {
        to: email,
        subject: 'Verify Email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            email: newUser.email,
            name: newUser.name,
        }
    });
}

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) throw httpError(404, 'User not found');

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
    res.json({
        message: 'Verification successful'
    })
}

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw httpError(404, 'User not found');
    if (user.verify) throw httpError(400, 'Verification has already been passed');

    const verifyEmail = {
        to: email,
        subject: 'Verify Email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: 'Verification email sent'
    })
}

const authorization = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordCompare = await bcrypt.compare(password, user.password);
    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });

    if (!user) throw httpError(401, "Email or password invalid");
    if (!passwordCompare) throw httpError(401, "Email or password invalid");
    if (!user.verify) throw httpError(401, 'Email not verify');

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token: token,
        user: {
            email: user.email,
            name: user.name,
            UserID: user._id
        }
    });
}

const getCurrent = async (req, res) => {
    const { email, name, token, id } = req.user;
    const settings = await ProfileSettings.findOne({ owner: id });
    console.log(settings)
    res.json({
        token: token,
        user: {
            email: email,
            name: name,
            UserID: id,
            ProfileSettings: settings
        }
    })
}

const logOut = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.status(204).json({
        message: "Logout success"
    })
}

export default {
    registration: ctrlWrapper(registration),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    authorization: ctrlWrapper(authorization),
    logOut: ctrlWrapper(logOut),
    getCurrent: ctrlWrapper(getCurrent),
}