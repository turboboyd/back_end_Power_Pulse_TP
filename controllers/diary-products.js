import { DiaryProduct } from "../models/diary-products.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Product } from "../models/products.js";

const addDiaryProducts = async (req, res) => {
  const { _id: owner } = req.user;
  const { productId } = req.body;
  const product = await Product.findById(productId);
  console.log('product', product);
  const result = await DiaryProduct.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeDiaryProducts = async (req, res) => {
  const { id } = req.params;
  const result = await DiaryProduct.findByIdAndRemove(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json({
    message: "Products deleted",
  });
};

export default {
  addDiaryProducts: ctrlWrapper(addDiaryProducts),
  removeDiaryProducts: ctrlWrapper(removeDiaryProducts),
};
