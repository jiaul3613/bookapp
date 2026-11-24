import { Router } from "express";
const router = Router();

import { bookController } from "./book.controller";
import { authMiddleware } from "../../middleware/auth.meddleware";

router.post('/book', bookController.bookCreateController);
router.get('/book',authMiddleware.varifyToken,authMiddleware.authorizedRoles('admin'), bookController.getBoolAllController);

export default router;