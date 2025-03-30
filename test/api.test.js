import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("POST /api/register", () => {
  const teacher = "teacherken@gmail.com";
  const students = ["student1@example.com", "student2@example.com"];

  it("should register students to a teacher", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ teacher, students });

    expect(res.statusCode).toBe(204);
  });

  it("should return 400 if teacher or students are missing", async () => {
    const res = await request(app).post("/api/register").send({ teacher });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 400 if students is not an array", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ teacher, students: "not-an-array" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});

describe("GET /api/commonstudents", () => {
  const teacher = "teacherken@gmail.com";

  it("should get common students for a single teacher", async () => {
    const res = await request(app).get(
      `/api/commonstudents?teacher=${encodeURIComponent(teacher)}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("students");
    expect(Array.isArray(res.body.students)).toBe(true);
  });

  it("should return 400 if teacher query is missing", async () => {
    const res = await request(app).get(`/api/commonstudents`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST /api/suspend", () => {
  it("should suspend a student", async () => {
    const res = await request(app)
      .post("/api/suspend")
      .send({ student: "student1@example.com" });

    expect(res.statusCode).toBe(204);
  });

  it("should return 400 if student email is missing", async () => {
    const res = await request(app).post("/api/suspend").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 500 or 404 if student does not exist", async () => {
    const res = await request(app)
      .post("/api/suspend")
      .send({ student: "nonexistent@example.com" });

    expect([404, 500]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST /api/retrievefornotifications", () => {
  const teacher = "teacherken@gmail.com";

  it("should retrieve notification recipients", async () => {
    const res = await request(app).post("/api/retrievefornotifications").send({
      teacher,
      notification: "Hello @student2@example.com",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("recipients");
    expect(res.body.recipients).toContain("student2@example.com");
    expect(res.body.recipients).not.toContain("student1@example.com"); // suspended
  });

  it("should return 400 if teacher or notification is missing", async () => {
    const res = await request(app)
      .post("/api/retrievefornotifications")
      .send({ notification: "Missing teacher" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
