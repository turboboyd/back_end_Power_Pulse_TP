import { DiaryProduct } from "../models/diary-products.js";
import { DiaryExercise } from "../models/diary-exercises.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { ProfileSettings } from "../models/profile-settings-model.js";

const listDiary = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Missing date parameter" });
  }

  const diaryProductPipeline = [
    {
      $match: {
        owner,
        date: new Date(date),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 1,
        amount: 1,
        calories: 1,
        category: "$item.category",
        title: "$item.title",
        recommended: "$item.groupBloodNotAllowed",
      },
    },
  ];

  const diaryExercisePipeline = [
    {
      $match: {
        owner,
        date: new Date(date),
      },
    },
    {
      $lookup: {
        from: "exercises",
        localField: "exercise",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 1,
        time: 1,
        calories: 1,
        bodyPart: "$item.bodyPart",
        equipment: "$item.equipment",
        name: "$item.name",
        target: "$item.target",
      },
    },
  ];

  const products = await DiaryProduct.aggregate(diaryProductPipeline);
  const exercises = await DiaryExercise.aggregate(diaryExercisePipeline);
    
  const { blood } = await ProfileSettings.findOne({ owner });
  const processedProducts = products.map(product => ({
    id: product._id.toString(),
    amount: product.amount,
    calories: product.calories,
    category: product.category,
    title: product.title,
    recommended: product.recommended[blood],
  }));

  const processedExercises = exercises.map(exercise => ({
    id: exercise._id.toString(),
    time: exercise.time,
    calories: exercise.calories,
    bodyPart: exercise.bodyPart,
    equipment: exercise.equipment,
    name: exercise.name,
    target: exercise.target,
  }));

  res.json({ products: processedProducts, exercises: processedExercises });
};

export default {
  listDiary: ctrlWrapper(listDiary),
};
