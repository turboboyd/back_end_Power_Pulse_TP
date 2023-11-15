import { Product } from "../models/products.js";
import { ProfileSettings } from "../models/profile-settings-model.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const listProducts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, search, category, recommended } = req.query;
  const skip = (page - 1) * limit;
  let query = [];
  if (search) {
    query.push({ title: { $regex: search, $options: "i" } });
  }
  if (category) {
    query.push({ category: { $regex: category, $options: "i" } });
  }
  if (recommended) {
    const { blood } = await ProfileSettings.findOne({ owner });
    const key = `groupBloodNotAllowed.${blood}`;
    query.push({ [key]: recommended });
  }
  if (query.length === 0) {
    query = {};
  } else {
    query = { $and: query };
  }
  const result = await Product.find(query, null, { skip, limit });
  res.json(result);
};

const listProductsСategory = async (req, res) => {
  const result = await Product.distinct("category");
  res.json(result);
};

export default {
  listProducts: ctrlWrapper(listProducts),
  listProductsСategory: ctrlWrapper(listProductsСategory),
};
