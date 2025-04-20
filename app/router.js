import { Router } from "express";
import { authController } from "./controllers/authController.js";
import { cw } from "./middlewares/controllerWrapper.js"

export const router = Router();

router.post("/login", cw(authController.loginUser));