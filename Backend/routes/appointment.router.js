import express from "express";
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from "../controllers/appointment.controller.js";
import { isAdminAuthenticated, isUserAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/post", isUserAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;