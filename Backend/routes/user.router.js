import express from "express";
import registerMember, { addNewDoctor, getUserDetails, logoutAdmin, logoutUser, login, getAllDoctors, changeTheme } from "../controllers/user.controller.js";
import { isUserAuthenticated, isAdminAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/register", registerMember);
router.post("/login", login);
router.get("/logout", isUserAuthenticated, logoutUser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/me", isUserAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/doctors", getAllDoctors);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
router.get("/change-theme/:mode", changeTheme);

export default router;