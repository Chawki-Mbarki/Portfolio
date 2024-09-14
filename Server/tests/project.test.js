const express = require("express");
const request = require("supertest");
const app = express();
const routes = require("../routes/project.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

describe("Project API", () => {
  let projectId;

  it("should create a new project", async () => {
    const res = await request(app)
      .post("/api/projects")
      .send({
        title: "Test Project",
        description: "Test Description",
        technologies: ["React", "Node.js"],
        image: "http://example.com/image.png",
        liveLink: "http://example.com",
        repoLink: "http://github.com",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    projectId = res.body._id;
  });

  it("should get all projects", async () => {
    const res = await request(app).get("/api/projects");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a project by ID", async () => {
    const res = await request(app).get(`/api/projects/${projectId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", projectId);
  });

  it("should update a project", async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .send({ title: "Updated Project" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "Updated Project");
  });

  it("should delete a project", async () => {
    const res = await request(app).delete(`/api/projects/${projectId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Project deleted successfully");
  });
});
