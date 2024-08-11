const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departmentsController');

router.get('/', departmentsController.getAllDepartments);
router.get('/:id', departmentsController.getDepartmentById); // Route to get a department by ID
router.post('/', departmentsController.createDepartment);
router.put('/:id', departmentsController.updateDepartment);
router.delete('/:id', departmentsController.deleteDepartment);

module.exports = router;
