import express from "express";
import { signin, signup } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { userSchema } from "../models/authModel.js";

const router = express.Router();

router.post("/signup", validate(userSchema), signup);
router.post("/signin", validate(userSchema), signin);

export default router;