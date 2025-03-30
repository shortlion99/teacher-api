import pool from "../db.js";

export const markStudentSuspended = async (student) => {
  const [result] = await pool.query(
    "UPDATE students SET suspended = true WHERE email = ?",
    [student],
  );
  if (result.affectedRows === 0) {
    throw new Error("Student not found");
  }
};

export const findRecipientsForNotification = async (teacher, notification) => {
  const mentionedEmails = (
    notification.match(/@[\w.+-]+@[\w-]+\.\w+/g) || []
  ).map((s) => s.slice(1));

  const [rows] = await pool.query(
    `
      SELECT DISTINCT s.email
      FROM students s
      LEFT JOIN registrations r ON s.email = r.student_email
      WHERE s.suspended = false AND (
        r.teacher_email = ? OR s.email IN (${mentionedEmails.map(() => "?").join(",") || "''"})
      )
    `,
    [teacher, ...mentionedEmails],
  );

  return rows.map((r) => r.email);
};
