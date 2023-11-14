import { Schema, model } from "mongoose";

const exerciseSchema = new Schema({
  bodyPart: {
    type: String
  },
  equipment: {
    type: String
  },
  gifUrl: {
    type: String
  },
  name: {
    type: String
  },
  target: {
    type: String
  },
  burnedCalories: {
    type: Number
  },
  time: {
    type: Number
  }
});

const exerciseСategorySchema = new Schema({
  filter: {
    type: String
  },
  name: {
    type: String
  },
  imgURL: {
    type: String
  },
});

export const ExerciseСategory = model('exercises-categories', exerciseСategorySchema);

export const Exercise = model('exercise', exerciseSchema);
