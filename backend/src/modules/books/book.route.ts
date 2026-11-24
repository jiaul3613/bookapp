import { Router } from "express";
const router = Router();

import { bookController } from "./book.controller";

router.post('/book', bookController.bookCreateController);
router.get('/book', bookController.getBoolAllController);

export default router;