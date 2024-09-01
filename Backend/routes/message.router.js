import express from "express";
import messageController, { getAllMessages } from "../controllers/message.controller.js";
import { isAdminAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/send", messageController);
router.get("/getmessages", isAdminAuthenticated, getAllMessages);

export default router;