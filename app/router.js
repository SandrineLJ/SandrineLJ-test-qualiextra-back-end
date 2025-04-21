import { Router } from "express";
import { authController } from "./controllers/authController.js";
import { adminController } from "./controllers/adminController.js";
import { userController } from "./controllers/userController.js";
import { cw } from "./middlewares/controllerWrapper.js"
import { isAuthed } from "./middlewares/isAuthed.js";
import { isAdmin } from "./middlewares/isAdmin.js";


export const router = Router();

router.post("/login", cw(authController.loginUser));
router.post("/signup", cw(authController.registerUser));
router.get("/verify", cw(authController.verifyUser))

// Routes utilisateurs authentifiés (Admin ou standards).
router.get("/private", isAuthed, (req, res) => {
    res.status(200).json({ message: `Hello ${req.user.firstname}` });
});
router.get("/me", isAuthed, cw(userController.getMe));
router.patch("/me", isAuthed, cw(userController.editMe));

// Routes Admin.
router.get("/users", isAuthed, isAdmin, cw(adminController.getAllUsers));
router.get("/users/:id", isAuthed, isAdmin, cw(adminController.getOneUser));
router.patch("/users/:id", isAuthed, isAdmin, cw(adminController.editUser));
router.delete("/users/:id", isAuthed, isAdmin, cw(adminController.deleteUser));