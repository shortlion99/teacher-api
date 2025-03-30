import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Teacher API Endpoints", () => {
  const teacher = "teacherken@gmail.com";
  const students = ["student1@example.com", "student2@example.com"];

  it("should register students to a teacher", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ teacher, students });

    expect(res.statusCode).toBe(204);
  });

  it("should get common students for a teacher", async () => {
    const res = await request(app).get(
      `/api/commonstudents?teacher=${encodeURIComponent(teacher)}`,
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("students");
    expect(res.body.students).toEqual(expect.arrayContaining(students));
  });

  it("should suspend a student", async () => {
    const res = await request(app)
      .post("/api/suspend")
      .send({ student: "student1@example.com" });

    expect(res.statusCode).toBe(204);
  });

  it("should retrieve notification recipients", async () => {
    const res = await request(app).post("/api/retrievefornotifications").send({
      teacher,
      notification: "Hello @student2@example.com",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("recipients");
    expect(res.body.recipients).toContain("student2@example.com");
    expect(res.body.recipients).not.toContain("student1@example.com");
  });
});
