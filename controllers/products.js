import { Product } from "../models/products.js";
import { ProfileSettings } from "../models/profile-settings-model.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const listProducts = async (req, res) => {
  const { page = 1, limit = 20, search, category, recommended } = req.query;
  const skip = (page - 1) * limit;
  const { _id: owner } = req.user;
  let query;
  if (search) {
    query = { title: { $regex: search, $options: "i" } };
  } else if (category) {
    query = { category: { $regex: category, $options: "i" } };
  } else if (recommended) {
    const { blood } = await ProfileSettings.findOne({ owner });
    const key = `groupBloodNotAllowed.${blood}`;
    query = { [key]: recommended };
  } else {
    query = {};
  }
  const result = await Product.find(query, null, { skip, limit });
  res.json(result);
};

export default {
  listProducts: ctrlWrapper(listProducts),
};
