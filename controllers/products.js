import { Product } from "../models/products.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const listProducts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Product.find({}, null, { skip, limit });
  res.json(result);
};

// const listProductsBlood = async (req, res) => {
//   const userBloodType = req.user.blood;
//   const allowBloodType = req.query.allowBloodType === 'true';
//   const query = allowBloodType ? { [`groupBloodNotAllowed.${userBloodType}`]: false } : { [`groupBloodNotAllowed.${userBloodType}`]: true };
//   const result = await Product.find(query);
//   res.json(result);
// };

export default {
  listProducts: ctrlWrapper(listProducts),
  // listProductsBlood: ctrlWrapper(listProductsBlood),
};
