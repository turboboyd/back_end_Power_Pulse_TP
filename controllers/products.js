import { Product } from "../models/products.js";
import { ProfileSettings } from "../models/profile-settings-model.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const listProducts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Product.find({}, null, { skip, limit });
  res.json(result);
};

const listProductsBlood = async (req, res) => {
  const { _id: owner } = req.user;
  const {allowBloodType} = req.query;
  const { blood } = await ProfileSettings.findOne({ owner });
  const key = `groupBloodNotAllowed.${blood}`;
  const result = await Product.find({ [key]: allowBloodType });
  res.json(result);
};


export default {
  listProducts: ctrlWrapper(listProducts),
  listProductsBlood: ctrlWrapper(listProductsBlood),
};
