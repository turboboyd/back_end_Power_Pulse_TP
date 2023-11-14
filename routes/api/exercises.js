import { Router } from "express";

import ctrl from "../../controllers/exercises.js";
import authenticate from '../../middlewares/authenticate.js';

const router = Router();

router.get("/", authenticate, ctrl.listExercises);
// router.get("/category", authenticate, ctrl.listExercisesCategory);

export default router;