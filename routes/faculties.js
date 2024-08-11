const express = require('express');
const router = express.Router();
const facultiesController = require('../controllers/facultiesController');

router.get('/', facultiesController.getAllFaculties);
router.get('/:id', facultiesController.getFacultyById); // Route to get a faculty by ID
router.post('/', facultiesController.createFaculty);
router.put('/:id', facultiesController.updateFaculty);
router.delete('/:id', facultiesController.deleteFaculty);

module.exports = router;
