import { Router } from "express";

import ctrl from "../../controllers/products.js";
import authenticate from "../../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, ctrl.listProducts);

export default router;