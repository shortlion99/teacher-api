import { markStudentSuspended } from "../services/studentService.js";
import { findRecipientsForNotification } from "../services/studentService.js";

export const suspendStudent = async (req, res) => {
  const { student } = req.body;

  if (!student)
    return res.status(400).json({ message: "Missing student email" });

  try {
    await markStudentSuspended(student);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotificationRecipients = async (req, res) => {
  const { teacher, notification } = req.body;

  if (!teacher || !notification) {
    return res.status(400).json({ message: "Missing teacher or notification" });
  }

  try {
    const recipients = await findRecipientsForNotification(
      teacher,
      notification,
    );
    res.status(200).json({ recipients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
