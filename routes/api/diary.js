import { Router } from "express";

import ctrlDiary from "../../controllers/diary.js";
import ctrlDiaryProducts from "../../controllers/diary-products.js";
import ctrlDiaryExercises from "../../controllers/diary-exercises.js";
import authenticate from '../../middlewares/authenticate.js';

const router = Router();

router.get("/", authenticate, ctrlDiary.listDiary);

router.get("/products", authenticate, ctrlDiaryProducts.listDiaryProducts);
router.post("/products", authenticate, ctrlDiaryProducts.addDiaryProducts);
router.delete("/products/:id", authenticate, ctrlDiaryProducts.removeDiaryProducts);

router.get("/exercises", authenticate, ctrlDiaryExercises.listDiaryExercise);
router.post("/exercises", authenticate, ctrlDiaryExercises.addDiaryExercise);
router.delete("/exercises/:id", authenticate, ctrlDiaryExercises.removeDiaryExercise);

export default router;