import { DiaryProduct } from "../models/diary-products.js";
import { DiaryExercise } from "../models/diary-exercises.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const listDiary = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: "Missing date parameter" });
  }
  const query = { owner, date };
  const products = await DiaryProduct.find(query);
  const exercises = await DiaryExercise.find(query);
  res.json({ products, exercises });
};

export default {
  listDiary: ctrlWrapper(listDiary),
};
