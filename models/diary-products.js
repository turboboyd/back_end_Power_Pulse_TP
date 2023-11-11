import { Schema, model } from "mongoose";

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
    products: [
      {
        product: {
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
      }
    ],
  },
  { versionKey: false }
);

export const DiaryProduct = model("diary-product", diaryProductSchema);
