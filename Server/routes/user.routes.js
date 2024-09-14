const userController = require('../controllers/user.controller');

module.exports = (app) => {
  app.get('/api/users', userController.getAllUsers);
  app.get('/api/users/:id', userController.getUserById);
  app.put('/api/users/:id', userController.updateUser);
  app.delete('/api/users/:id', userController.deleteUser);
  app.post('/api/users/register', userController.registerUser);
  app.post('/api/users/login', userController.loginUser);
  app.post('/api/users/logout', userController.logoutUser);
  app.get("/api/users/protected", userController.authenticate, (req, res) => {
    res.status(200).json({ message: "Access granted" });
  });
};
