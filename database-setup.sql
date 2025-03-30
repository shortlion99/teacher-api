CREATE TABLE IF NOT EXISTS teachers (
  email VARCHAR(255) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS students (
  email VARCHAR(255) PRIMARY KEY,
  suspended BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS registrations (
  teacher_email VARCHAR(255),
  student_email VARCHAR(255),
  PRIMARY KEY (teacher_email, student_email),
  FOREIGN KEY (teacher_email) REFERENCES teachers(email),
  FOREIGN KEY (student_email) REFERENCES students(email)
);
