import { Exercise, ExerciseСategory } from "../models/exercises.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const listExercisesTypes = async (req, res) => {
  const { page = 1, limit = 10, type } = req.query;
  const skip = (page - 1) * limit;
  const query = { filter: { $regex: type, $options: "i" } };
  const totalRecords = await ExerciseСategory.countDocuments(query);
  const result = await ExerciseСategory.find(query, null, { skip, limit });
  res.setHeader('X-Total-Count', totalRecords);
  res.json(result);
};

const listExercises = async (req, res) => {
  const { page = 1, limit = 20, id } = req.query;
  const { name } = await ExerciseСategory.findById(id);
  const categoryRegex = { $regex: name, $options: "i" };
  const query = {
    $or: [
      { bodyPart: categoryRegex },
      { equipment: categoryRegex },
      { name: categoryRegex },
      { target: categoryRegex },
    ],
  };
  const skip = (page - 1) * limit;
  const totalRecords = await Exercise.countDocuments(query);
  const result = await Exercise.find(query, null, { skip, limit });
  
  res.setHeader('X-Total-Count', totalRecords);
  res.json(result);
};


export default {
  listExercises: ctrlWrapper(listExercises),
  listExercisesTypes: ctrlWrapper(listExercisesTypes),
};
