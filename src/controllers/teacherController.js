import { registerTeacherWithStudents } from "../services/teacherService.js";
import { findCommonStudents } from "../services/teacherService.js";

export const registerStudents = async (req, res) => {
  const { teacher, students } = req.body;

  if (!teacher || !Array.isArray(students)) {
    return res.status(400).json({ message: "Invalid request format" });
  }

  try {
    await registerTeacherWithStudents(teacher, students);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCommonStudents = async (req, res) => {
  let teachers = req.query.teacher;

  if (!teachers) return res.status(400).json({ message: "Missing teacher(s)" });

  if (!Array.isArray(teachers)) teachers = [teachers];

  try {
    const students = await findCommonStudents(teachers);
    res.status(200).json({ students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
