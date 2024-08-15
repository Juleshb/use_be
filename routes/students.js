const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
const auth = require('../middleware/auth');

// Protected routes with role-based access
router.get('/', studentsController.getAllStudents); // Any authenticated user can access
router.get('/sum', studentsController.getTotalStudents);
router.get('/:id', auth(), studentsController.getStudentById); // Any authenticated user can access
router.get('/reg/:matricule', studentsController.getStudentById); 
router.post('/', auth('admin'), studentsController.createStudent); // Only admins can create students
router.put('/:id', auth('admin'), studentsController.updateStudent); // Only admins can update students
router.delete('/:id', auth('super-admin'), studentsController.deleteStudent); // Only super-admins can delete students

module.exports = router;
