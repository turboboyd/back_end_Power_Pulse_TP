import { Exercise } from "../models/exercises.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const listExercises = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Exercise.find({}, null, { skip, limit });
  res.json(result);
};

const listExerciseTypes = async (req, res) => {
  const bodyParts = await Exercise.distinct("bodyPart");
  const targets = await Exercise.distinct("target");
  const equipment = await Exercise.distinct("equipment");
  res.json({ bodyParts, targets, equipment });
};

export default {
  listExercises: ctrlWrapper(listExercises),
  listExerciseTypes: ctrlWrapper(listExerciseTypes),
};
