import { Router } from "express";
import { authController } from "./controllers/authController.js";
import { cw } from "./middlewares/controllerWrapper.js"
import { isAuthed } from "./middlewares/isAuthed.js";
import { userController } from "./controllers/userController.js";
import { isAdmin } from "./middlewares/isAdmin.js";

export const router = Router();

router.post("/login", cw(authController.loginUser));

// Routes utilisateurs authentifiés (Admin ou standards).
router.get("/private", isAuthed, (req, res) => {
    res.status(200).json({ message: `Hello ${req.user.firstname}` });
});
router.get("/me", isAuthed, cw(userController.getMe));

// Routes Admin.
router.get("/users", isAuthed, isAdmin, cw(userController.getAll));
router.get("/users/:id", isAuthed, isAdmin, cw(userController.getOne));
router.patch("/users/:id", isAuthed, isAdmin, cw(userController.edit));
router.delete("/users/:id", isAuthed, isAdmin, cw(userController.delete));