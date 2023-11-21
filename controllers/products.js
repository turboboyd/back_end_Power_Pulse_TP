import { Product } from "../models/products.js";
import { ProfileSettings } from "../models/profile-settings-model.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const listProducts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, search, category, recommended } = req.query;
  const skip = (page - 1) * limit;
  const { blood } = await ProfileSettings.findOne({ owner });
  let query = {};

  search && (query.title = { $regex: search, $options: "i" });
  category && (query.category = { $regex: category, $options: "i" });
  recommended && (query[`groupBloodNotAllowed.${blood}`] = recommended);
  query = Object.keys(query).length === 0 ? {} : { $and: [query] };

  const totalRecords = await Product.countDocuments(query);
  const result = await Product.find(query, null, { skip, limit });

  res.setHeader("X-Total-Count", totalRecords);
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
