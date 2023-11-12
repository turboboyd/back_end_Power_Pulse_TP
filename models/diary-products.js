import { Schema, model } from "mongoose";
// import Joi from "joi";

// import { Product } from "./products.js";

const diaryProductSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    amount: {
      type: Number,
      min: 1,
      required: true,
    },
    calories: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  { versionKey: false }
);


// const addSchema = Joi.object({
//   date: Joi.date().required().messages({
//     "date.base": "date must be a valid date",
//     "any.required": "date is a required field"
//   }),
//   products: Joi.array()
//     .items(
//       Joi.object({
//         product: Joi.string()
//           .required()
//           .hex()
//           .length(24)
//           .external(async (value) => {
//             const product = await Product.findById(value);
//             if (!product) {
//               throw new Error("product does not exist");
//             }
//             return value;
//           })
//           .messages({
//             "string.base": "product must be a valid ObjectId",
//             "string.hex": "product must be a valid ObjectId",
//             "string.length": "product must be a valid ObjectId",
//             "any.required": "product is a required field"
//           }),
//         amount: Joi.number()
//           .required()
//           .min(1)
//           .messages({
//             "number.base": "amount must be a positive number",
//             "number.min": "amount must be a positive number",
//             "any.required": "amount is a required field"
//           }),
//         calories: Joi.number()
//           .required()
//           .min(1)
//           .messages({
//             "number.base": "calories must be a positive number",
//             "number.min": "calories must be a positive number",
//             "any.required": "calories is a required field"
//           }),
//       })
//     )
//     .min(1)
//     .messages({
//       "array.base": "products must be a non-empty array",
//       "array.min": "products must be a non-empty array"
//     }),
// });


// export const schemasDiaryProducts = {
//   addSchema,
// };

export const DiaryProduct = model("diary-product", diaryProductSchema);
