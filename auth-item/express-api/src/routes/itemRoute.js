import express from "express";
import { validate } from "../middlewares/validate.js";
import { itemSchema } from "../models/itemModel.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createItem, deleteItems, getItem, modifyItem } from "../controllers/itemController.js";

const router = express.Router();

router.post("/items", authMiddleware, validate(itemSchema), createItem);
router.get("/items", getItem);
router.put("/items/:id", authMiddleware, modifyItem);
router.delete("/items/:id", authMiddleware, deleteItems);

export default router;