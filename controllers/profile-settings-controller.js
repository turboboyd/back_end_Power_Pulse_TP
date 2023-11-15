import ctrlWrapper from "../helpers/ctrlWrapper.js";
import httpError from "../helpers/HttpError.js";
import { ProfileSettings } from "../models/profile-settings-model.js";
import User from "../models/user-model.js";

const addProfileSettings = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await ProfileSettings.create({ ...req.body.profileSettings, owner })
    res.status(201).json(result);
}

const updateProfileSettings = async (req, res) => {
    const { id, _id: owner } = req.user;
    const result = await ProfileSettings.findOneAndUpdate({ owner: id }, req.body.profileSettings);
    if (result === null) {
        await ProfileSettings.create({ ...req.body.profileSettings, owner });
    }
    const dataRes = await ProfileSettings.findOne({ owner: id }, '-updatedAt -_id -createdAt');
    
    const userChange = await User.findOneAndUpdate({ _id: id }, { name: req.body.name });
    const user = await User.findOne({ _id: id });
    if (!userChange) throw httpError(404, 'Not Found');

    res.json({
        user: {
            email: user.email,
            name: user.name,
            avatarURL: user.avatarURL,
            registrDate: user.createdAt,
            profileSettings: dataRes,
        },
    });
}

const getProfileSettings = async (req, res) => {
    const { id } = req.user;
    const result = await ProfileSettings.findOne({ owner: id }, '-updatedAt -_id');
    const user = await User.findOne({ _id: id });

    if (!result) throw httpError(404, 'Not Found');
    if (!user) throw httpError(404, 'Not Found');

    res.json({
        user: {
            email: user.email,
            name: user.name,
            avatarURL: user.avatarURL,
            registrDate: user.createdAt,
            profileSettings: result,
        },
    });
}

export default {
    addProfileSettings: ctrlWrapper(addProfileSettings),
    updateProfileSettings: ctrlWrapper(updateProfileSettings),
    getProfileSettings: ctrlWrapper(getProfileSettings),
}