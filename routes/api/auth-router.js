import express from 'express';
import authController from '../../controllers/auth-controller.js';
import isEmptyBody from '../../middlewares/isEmptyBody.js';
import authenticate from '../../middlewares/authenticate.js';
import upload from '../../middlewares/upload.js';
import validateBodyAuth from '../../helpers/validateBodyAuth.js';
import { userAuthorizationJoiSchema, userRegistrationJoiSchema, userEmailJoiSchema } from '../../models/user-model.js';

const authRouter = express.Router();
const userRegistrationValidate = validateBodyAuth(userRegistrationJoiSchema);
const userAuthorizationValidate = validateBodyAuth(userAuthorizationJoiSchema);
const userEmailValidate = validateBodyAuth(userEmailJoiSchema);

authRouter.post('/register', isEmptyBody, userRegistrationValidate, authController.registration);
authRouter.get('/verify/:verificationToken', authController.verify);
authRouter.post('/verify', isEmptyBody, userEmailValidate, authController.resendVerifyEmail);
authRouter.post('/login', isEmptyBody, userAuthorizationValidate, authController.authorization);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.logOut);
authRouter.patch('/avatar', authenticate, upload.single('avatar'), authController.updateAvatar);

export default authRouter;