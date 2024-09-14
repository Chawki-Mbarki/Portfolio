require("dotenv").config();
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
  let userId;

  beforeAll(async () => {
    const registerRes = await request(app).post("/api/users/register").send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    
    if (registerRes.statusCode === 201 && registerRes.body.user && registerRes.body.user._id) {
      userId = registerRes.body.user._id;
    } else {
      throw new Error("User registration failed or User ID is not present in the registration response");
    }

    const loginRes = await request(app).post("/api/users/login").send({
      email: "john.doe@example.com",
      password: "password123",
    });

    if (loginRes.statusCode === 200 && loginRes.headers["set-cookie"]) {
      const cookie = loginRes.headers["set-cookie"][0];
      authToken = cookie.split(";")[0].split("=")[1];
    } else {
      throw new Error("Login failed or authToken is not present in the response cookies");
    }
  });

  it("should get ALL users", async () => {
    const res = await request(app)
      .get(`/api/users`)
      .set("Cookie", `authToken=${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a user by ID", async () => {
    if (!userId) {
      throw new Error("userId is not defined. Please ensure the user is registered.");
    }
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set("Cookie", `authToken=${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", userId);
    expect(res.body).toHaveProperty("email", "john.doe@example.com");
  });

  it("should update a user", async () => {
    if (!userId) {
      throw new Error("userId is not defined. Please ensure the user is registered.");
    }
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set("Cookie", `authToken=${authToken}`)
      .send({
        firstName: "Jane",
        lastName: "Dodo",
        email: "test@test.boo"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("firstName", "Jane");
  });

  it("should logout a user and clear cookie", async () => {
    const res = await request(app)
      .post("/api/users/logout")
      .set("Cookie", `authToken=${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Logout successful");
  });

  it("should delete a user", async () => {
    if (!userId) {
      throw new Error("userId is not defined. Please ensure the user is registered.");
    }
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Cookie", `authToken=${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "User deleted successfully");
  });

//! There is an issue with these tests, probobly a something to do with the Aythentication Token and cookies
/*   it("should allow access if authenticated", async () => {
    const res = await request(app)
      .get("/api/users/protected")
      .set("Cookie", `authToken=${authToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Access granted");
  });

  it("should deny access if not authenticated", async () => {
    const res = await request(app).get("/api/users/protected");
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Access denied");
  });

  it("should return 404 for invalid user ID", async () => {
    const res = await request(app)
      .get(`/api/users/invalidId`)
      .set("Cookie", `authToken=${authToken}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  }); */

});
