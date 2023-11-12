import { Schema, model } from "mongoose";
// import Joi from "joi";

// import { Exercise } from "./exercises.js";

const diaryExerciseSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: "exercises",
      required: true,
    },
    time: {
      type: Number,
      min: 1,
      required: true,
    },
    calories: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  { versionKey: false }
);

// const addSchema = Joi.object({
//   date: Joi.date().required().messages({
//     "date.base": "date must be a valid date",
//     "any.required": "date is a required field"
//   }),
//   exercises: Joi.array()
//     .items(
//       Joi.object({
//         exercise: Joi.string()
//           .required()
//           .hex()
//           .length(24)
//           .external(async (value) => {
//             const exercise = await Exercise.findById(value);
//             if (!exercise) {
//               throw new Error("exercise does not exist");
//             }
//             return value;
//           })
//           .messages({
//             "string.base": "exercise must be a valid ObjectId",
//             "string.hex": "exercise must be a valid ObjectId",
//             "string.length": "exercise must be a valid ObjectId",
//             "any.required": "exercise is a required field"
//           }),
//         time: Joi.number()
//           .required()
//           .min(1)
//           .messages({
//             "number.base": "time must be a positive number",
//             "number.min": "time must be a positive number",
//             "any.required": "time is a required field"
//           }),
//         calories: Joi.number()
//           .required()
//           .min(1)
//           .messages({
//             "number.base": "calories must be a positive number",
//             "number.min": "calories must be a positive number",
//             "any.required": "calories is a required field"
//           }),
//       })
//     )
//     .min(1)
//     .messages({
//       "array.base": "exercises must be a non-empty array",
//       "array.min": "exercises must be a non-empty array"
//     }),
// });


// export const schemasDiaryExercise = {
//   addSchema,
// };

export const DiaryExercise = model('diary-exercise', diaryExerciseSchema);
