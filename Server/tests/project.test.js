const request = require('supertest');
const express = require('express');
const app = express();
const routes = require('../routes/project.routes');
const Project = require('../models/project.model');

// Apply the routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

describe('Project API', () => {
  let projectId;

  // Test creating a new project
  it('should create a new project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({
        title: 'Test Project',
        description: 'Test Description',
        technologies: ['React', 'Node.js'],
        image: 'http://example.com/image.png',
        liveLink: 'http://example.com',
        repoLink: 'http://github.com',
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    projectId = res.body._id;
  });

  // Test getting all projects
  it('should get all projects', async () => {
    const res = await request(app).get('/api/projects');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test getting a single project by ID
  it('should get a project by ID', async () => {
    const res = await request(app).get(`/api/projects/${projectId}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', projectId);
  });

  // Test updating a project
  it('should update a project', async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .send({ title: 'Updated Project' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Project');
  });

  // Test deleting a project
  it('should delete a project', async () => {
    const res = await request(app).delete(`/api/projects/${projectId}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Project deleted successfully');
  });
});
