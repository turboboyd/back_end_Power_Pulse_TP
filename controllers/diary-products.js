import { DiaryProduct } from "../models/diary-products.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Product } from "../models/products.js";
import { ProfileSettings } from "../models/profile-settings-model.js";

const addDiaryProducts = async (req, res) => {
  const { _id: owner } = req.user;
  const { product } = req.body;
  if (!product) {
    return res.status(400).json({ error: "Missing product parameter" });
  }
  const { blood } = await ProfileSettings.findOne({ owner });
  const { id, category, title, groupBloodNotAllowed} = await Product.findById(product);
  const recommended = groupBloodNotAllowed[blood];
  const { amount, calories } = await DiaryProduct.create({ ...req.body, owner });
  res.status(201).json({ id, title, category, calories, amount, recommended });
};

const removeDiaryProducts = async (req, res) => {
  const { id } = req.params;
  const result = await DiaryProduct.findByIdAndRemove(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

export default {
  addDiaryProducts: ctrlWrapper(addDiaryProducts),
  removeDiaryProducts: ctrlWrapper(removeDiaryProducts),
};
