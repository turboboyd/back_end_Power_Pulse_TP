import { DiaryProduct } from "../models/diary-products.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Product } from "../models/products.js";
import { ProfileSettings } from "../models/profile-settings-model.js";
import httpError from "../helpers/HttpError.js";

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
  res.status(201).json({ _id: id, title, category, calories, amount, recommended });
};

const removeDiaryProducts = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
    const diaryProduct = await DiaryProduct.findById(id);
    if (!diaryProduct) {
      throw httpError(404, "Not found");
    }
    if (diaryProduct.owner.toString() !== owner.toString()) {
      throw httpError(403, "You do not have permission to delete this resource");
    }
    const result = await DiaryProduct.findByIdAndRemove(id);
    res.json(result);
};

export default {
  addDiaryProducts: ctrlWrapper(addDiaryProducts),
  removeDiaryProducts: ctrlWrapper(removeDiaryProducts),
};
