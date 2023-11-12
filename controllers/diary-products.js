import { DiaryProduct } from "../models/diary-products.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const listDiaryProducts = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'Missing date parameter' });
  }
  const query = { owner, date };
    const result = await DiaryProduct.find(query);
    res.json(result);
};

const addDiaryProducts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await DiaryProduct.create({ ...req.body, owner});
  res.status(201).json(result);
};

const removeDiaryProducts = async (req, res) => {
  const { id } = req.params;
  const result = await DiaryProduct.findByIdAndRemove(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json({
    message: "Exercise deleted",
  });
};

export default {
  listDiaryProducts: ctrlWrapper(listDiaryProducts),
  addDiaryProducts: ctrlWrapper(addDiaryProducts),
  removeDiaryProducts: ctrlWrapper(removeDiaryProducts),
};