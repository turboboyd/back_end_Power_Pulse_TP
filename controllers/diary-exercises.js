import { DiaryExercise } from "../models/diary-exercises.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Exercise } from "../models/exercises.js";
import httpError from "../helpers/HttpError.js";

const addDiaryExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const { exercise } = req.body;
  if (!exercise) {
    return res.status(400).json({ error: "Missing exercise parameter" });
  }
  const { id, bodyPart, equipment, name, target } = await Exercise.findById(exercise);
  const { time, calories } = await DiaryExercise.create({ ...req.body, owner });
  res.status(201).json({ _id: id, bodyPart,  equipment, name, target, calories, time });
};

const removeDiaryExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
    const diaryExercise = await DiaryExercise.findById(id);
    if (!diaryExercise) {
      throw httpError(404, "Not found");
    }
    if (diaryExercise.owner.toString() !== owner.toString()) {
      throw httpError(403, "You do not have permission to delete this resource");
    }
    const result = await DiaryExercise.findByIdAndRemove(id);
    res.json(result);
};


export default {
  addDiaryExercise: ctrlWrapper(addDiaryExercise),
  removeDiaryExercise: ctrlWrapper(removeDiaryExercise),
};
