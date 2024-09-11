const projectController = require('../controllers/project.controller');

module.exports = (app) => {
  app.get('/api/projects', projectController.getAllProjects);
  app.get('/api/projects/:id', projectController.getProjectById);
  app.post('/api/projects', projectController.createProject);
  app.put('/api/projects/:id', projectController.updateProject);
  app.delete('/api/projects/:id', projectController.deleteProject);
};
