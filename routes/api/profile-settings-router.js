import express from 'express';
import ProfileSettings from '../../controllers/profile-settings-controller.js';
import idValidation from '../../middlewares/idValidation.js';
import isEmptyBody from '../../middlewares/isEmptyBody.js';
import authenticate from '../../middlewares/authenticate.js';
import profileSetingsValidate from '../../middlewares/profileSetingsValidate.js';
import validateBody from '../../helpers/validateBody.js';
import { profileSettingsJoiAddSchema } from '../../models/profile-settings-model.js';
import bmrCalculation from '../../helpers/bmrCalculation.js';

const profileSetingsRouter = express.Router();
const profileSetingsJoiValidate = validateBody(profileSettingsJoiAddSchema);

profileSetingsRouter.use(authenticate);
profileSetingsRouter.post('/', isEmptyBody, profileSetingsJoiValidate, bmrCalculation, profileSetingsValidate, ProfileSettings.addProfileSettings);
profileSetingsRouter.put('/', isEmptyBody, profileSetingsJoiValidate, bmrCalculation,ProfileSettings.updateProfileSettings)
profileSetingsRouter.get('/', ProfileSettings.getProfileSettings)

export default profileSetingsRouter;