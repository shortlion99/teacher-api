import express from "express";
import { registerStudents } from "../controllers/teacherController.js";

const router = express.Router();
router.post("/register", registerStudents);

export default router;
