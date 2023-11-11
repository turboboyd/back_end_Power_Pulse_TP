import { Schema, model } from "mongoose";

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
    exercises: [
      {
        exercise: {
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
      }
    ],
  },
  { versionKey: false }
);

export const DiaryExercise = model('diary-exercise', diaryExerciseSchema);
