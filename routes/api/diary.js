import { Router } from "express";

import ctrlDiary from "../../controllers/diary.js";
import ctrlDiaryProducts from "../../controllers/diary-products.js";
import ctrlDiaryExercises from "../../controllers/diary-exercises.js";
import authenticate from "../../middlewares/authenticate.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import idValidation from "../../middlewares/idValidation.js";
import { joiSchemasProducts } from "../../models/diary-products.js";
import { joiSchemasExercise } from "../../models/diary-exercises.js";

// const diaryProductsAddValidate = isEmptyBody(joiSchemasProducts.addSchema)
// const diaryProductsAddValidate = isEmptyBody(joiSchemasExercise.addSchema)

const router = Router();

router.get("/", authenticate, ctrlDiary.listDiary);

router.post(
  "/products",
  authenticate,
  isEmptyBody,
  ctrlDiaryProducts.addDiaryProducts
);
router.delete(
  "/products/:id",
  authenticate,
  idValidation,
  ctrlDiaryProducts.removeDiaryProducts
);

router.post(
  "/exercises",
  authenticate,
  isEmptyBody,
  ctrlDiaryExercises.addDiaryExercise
);
router.delete(
  "/exercises/:id",
  authenticate,
  idValidation,
  ctrlDiaryExercises.removeDiaryExercise
);

export default router;
