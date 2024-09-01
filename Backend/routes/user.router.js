import express from "express";
import userController, { addNewDoctor, getUserDetails, logoutAdmin, logoutUser } from "../controllers/user.controller.js";
import { login , getAllDoctors } from "../controllers/user.controller.js";
import { isUserAuthenticated, isAdminAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/register", userController);
router.post("/login", login);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/me", isUserAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/logout", isUserAuthenticated, logoutUser);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);

export default router;