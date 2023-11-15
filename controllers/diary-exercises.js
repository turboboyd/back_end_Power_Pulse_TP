import { DiaryExercise } from "../models/diary-exercises.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Exercise } from "../models/exercises.js";

const addDiaryExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const { exercise } = req.body;
  const { id, bodyPart, equipment, name, target } = await Exercise.findById(exercise);
  console.log('bodyPart', bodyPart);
  const { time, calories } = await DiaryExercise.create({ ...req.body, owner });
  res.status(201).json({ time, calories, bodyPart, equipment, name, target, id });
};

const removeDiaryExercise = async (req, res) => {
  const { id } = req.params;
  const result = await DiaryExercise.findByIdAndRemove(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json({
    message: "Exercise deleted",
  });
};

export default {
  addDiaryExercise: ctrlWrapper(addDiaryExercise),
  removeDiaryExercise: ctrlWrapper(removeDiaryExercise),
};
