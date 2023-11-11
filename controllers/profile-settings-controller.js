import ctrlWrapper from "../helpers/ctrlWrapper.js";
import httpError from "../helpers/HttpError.js";
import { ProfileSettings } from "../models/profile-settings-model.js";

const addProfileSettings = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await ProfileSettings.create({ ...req.body, owner })
    res.status(201).json(result);
}

const updateProfileSettings = async (req, res) => {
    const { id } = req.user;
    const result = await ProfileSettings.findOneAndUpdate({ owner: id }, req.body);
    if (!result) throw httpError(404, 'Not Found');
    res.json(result);
}

const getProfileSettings = async (req, res) => {
    const { id } = req.user;
    const result = await ProfileSettings.findOne({ owner: id });
    if (!result) throw httpError(404, 'Not Found');
    res.json(result);
}

export default {
    addProfileSettings: ctrlWrapper(addProfileSettings),
    updateProfileSettings: ctrlWrapper(updateProfileSettings),
    getProfileSettings: ctrlWrapper(getProfileSettings),
}