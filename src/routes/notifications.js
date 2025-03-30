import express from "express";
import { getNotificationRecipients } from "../controllers/studentController.js";

const router = express.Router();
router.post("/retrievefornotifications", getNotificationRecipients);

export default router;
