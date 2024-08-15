const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');

// Public routes
router.post('/login', usersController.login);

// Protected routes with role-based access
router.get('/', auth('super-admin'), usersController.getAllUsers); // Only super-admins can access
router.get('/:id', auth(), usersController.getUserById); // Any authenticated user can access
router.post('/', usersController.createUser); // Only admins can create users
router.put('/:id', auth('super-admin'), usersController.updateUser); // Only admins can update users
router.delete('/:id', auth('super-admin'), usersController.deleteUser); // Only super-admins can delete users

module.exports = router;
