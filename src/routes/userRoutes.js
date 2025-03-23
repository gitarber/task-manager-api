const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');
const { validateUserRegistration } = require('../middleware/validation');

// Public routes
router.post('/register', validateUserRegistration, userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/me', authenticateToken, userController.getCurrentUser);

module.exports = router; 