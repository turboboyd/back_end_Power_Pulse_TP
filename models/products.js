import { Schema, model } from "mongoose";

const productSchema = new Schema({
  weight: {
    type: Number
  },
  calories: {
    type: Number
  },
  category: {
    type: String
  },
  title: {
    type: String
  },
  groupBloodNotAllowed: {
    "1": {
      type: Boolean
    },
    "2": {
      type: Boolean
    },
    "3": {
      type: Boolean
    },
    "4": {
      type: Boolean
    }
  }
});

export const Product = model('product', productSchema);
