import express from "express";
import { getCommonStudents } from "../controllers/teacherController.js";

const router = express.Router();
router.get("/commonstudents", getCommonStudents);

export default router;
