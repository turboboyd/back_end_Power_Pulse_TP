import httpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { ProfileSettings } from "../models/profile-settings-model.js";


const profileSettingsValidate = async (req, res, next) => {
    const check = await ProfileSettings.findOne({ owner: req.user.id })
    if (check !== null) throw httpError(400, 'Data has been already added')
    next()
}

export default ctrlWrapper(profileSettingsValidate);