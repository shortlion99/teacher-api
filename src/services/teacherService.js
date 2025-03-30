import pool from "../db.js";

export const registerTeacherWithStudents = async (teacher, students) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("INSERT IGNORE INTO teachers (email) VALUES (?)", [
      teacher,
    ]);

    for (const student of students) {
      await conn.query("INSERT IGNORE INTO students (email) VALUES (?)", [
        student,
      ]);
      await conn.query(
        "INSERT IGNORE INTO registrations (teacher_email, student_email) VALUES (?, ?)",
        [teacher, student],
      );
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export const findCommonStudents = async (teachers) => {
  const placeholders = teachers.map(() => "?").join(",");
  const query = `
      SELECT student_email
      FROM registrations
      WHERE teacher_email IN (${placeholders})
      GROUP BY student_email
      HAVING COUNT(DISTINCT teacher_email) = ?
    `;

  const [rows] = await pool.query(query, [...teachers, teachers.length]);
  return rows.map((r) => r.student_email);
};
