import express from "express";
import { suspendStudent } from "../controllers/studentController.js";

const router = express.Router();
router.post("/suspend", suspendStudent);

export default router;
