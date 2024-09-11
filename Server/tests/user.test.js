require("dotenv").config(); // Ensure .env variables are loaded for tests
const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRoutes = require("../routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
userRoutes(app);

describe("User API", () => {
  let authToken;

  it("should register a new user", async () => {
    const res = await request(app).post("/api/register").send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should login a user and set cookie", async () => {
    const res = await request(app).post("/api/login").send({
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
    expect(res.headers["set-cookie"][0]).toMatch(/authToken/);

    const cookie = res.headers["set-cookie"][0];
    authToken = cookie.split(";")[0].split("=")[1];
  });

  it("should allow access if authenticated", async () => {
    const res = await request(app)
      .get("/api/protected")
      .set("Cookie", `authToken=${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Access granted");
  });

  it("should deny access if not authenticated", async () => {
    const res = await request(app).get("/api/protected");
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Access denied");
  });

  it('should logout a user and clear cookie', async () => {
    const res = await request(app)
      .post('/api/logout')
      .set('Cookie', `authToken=${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Logout successful');
  });
});
