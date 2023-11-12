import { Schema, model } from "mongoose";
import Joi from 'joi';
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const profileSettingsSchema = new Schema({
    height: {
        type: Number,
        min: 150,
        required: true
    },
    currentWeight: {
        type: Number,
        min: 35,
        required: true
    },
    desiredWeight: {
        type: Number,
        min: 35,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    blood: {
        type: Number,
        enum: [1, 2, 3, 4],
        reuired: true,
    },
    sex: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    levelActivity: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    bmr: {
        type: Number
    }
}, { versionKey: false, timestamps: true })

profileSettingsSchema.post('save', handleSaveError);
profileSettingsSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);
profileSettingsSchema.post('findOneAndUpdate', handleSaveError);

export const profileSettingsJoiAddSchema = Joi.object({
    height: Joi.number()
        .min(150)
        .required(),
    currentWeight: Joi.number()
        .min(35)
        .required(),
    desiredWeight: Joi.number()
        .min(35)
        .required(),
    birthday: Joi.date()
        .required(),
    blood: Joi.number()
        .integer()
        .valid(1, 2, 3, 4)
        .required(),
    sex: Joi.string()
        .valid("male", "female")
        .required(),
    levelActivity: Joi.number()
        .integer()
        .valid(1, 2, 3, 4, 5)
        .required(),
})

export const ProfileSettings = model('profileSettings', profileSettingsSchema);