const userController = require('../controllers/user.controller');

module.exports = (app) => {
  app.post('/api/register', userController.registerUser);
  app.post('/api/login', userController.loginUser);
  app.post('/api/logout', userController.logoutUser);
  app.get('/api/protected', userController.authenticate, (req, res) => {
    res.status(200).json({ message: 'Access granted' });
  });
};
