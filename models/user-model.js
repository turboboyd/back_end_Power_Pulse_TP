import { Schema, model } from "mongoose";
import Joi from 'joi';
import { handleSaveError, runValidatorsAtUpdate } from './hooks.js';

const emailPattern = /^\w+(?:[\w.-]*\w)?@[a-zA-Z_]+(?:\.[a-zA-Z]+)+$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailPattern,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Set password for user'],
    },
    token: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: true,
    },
    verificationToken: {
        type: String,
    },
    avatarURL: {
        type: String
    }
}, { versionKey: false, timestamps: true })

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);
userSchema.post('findOneAndUpdate', handleSaveError);

export const userRegistrationJoiSchema = Joi.object({
    name: Joi
        .string()
        .required(),
    email: Joi
        .string().required()
        .pattern(emailPattern)
        .messages({
            "string.pattern.base": "Invalid email format",
            "any.required": "missing required email field",
        }),
    password: Joi.string()
        .required()
        .min(6)
        .messages({
            "string.min": "Password length must be at least 6 characters long",
            "any.required": "missing required password field"
        })
})

export const userAuthorizationJoiSchema = Joi.object({
    email: Joi
        .string()
        .required()
        .pattern(emailPattern)
        .messages({
            "string.email": "Invalid email format",
            "any.required": "missing required email field",
        }),
    password: Joi
        .string()
        .required()
        .min(6)
        .messages({
            "string.min": "Password length must be at least 6 characters long",
            "any.required": "missing required password field"
        })
})

export const userEmailJoiSchema = Joi.object({
    email: Joi
        .string()
        .pattern(emailPattern)
        .required()
        .messages({
            "string.email": "Invalid email format",
            "any.required": "missing required email field",
        }),
})

const User = model('user', userSchema);
export default User;