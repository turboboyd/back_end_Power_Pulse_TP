import { DiaryExercise } from "../models/diary-exercises.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const listDiaryExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'Missing date parameter' });
  }
  const query = { owner, date };
    const result = await DiaryExercise.find(query);
    res.json(result);
};

const addDiaryExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await DiaryExercise.create({ ...req.body, owner});
  res.status(201).json(result);
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
  listDiaryExercise: ctrlWrapper(listDiaryExercise),
  addDiaryExercise: ctrlWrapper(addDiaryExercise),
  removeDiaryExercise: ctrlWrapper(removeDiaryExercise),
};