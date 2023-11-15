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
  const products = await DiaryProduct.find(query, { amount: 1, calories: 1, _id: 1 });
  const exercises = await DiaryExercise.find(query, { time: 1, calories: 1, _id: 1 });
  res.json({ products, exercises });
};

export default {
  listDiary: ctrlWrapper(listDiary),
};
