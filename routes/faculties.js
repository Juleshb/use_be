const express = require('express');
const router = express.Router();
const facultiesController = require('../controllers/facultiesController');

router.get('/', facultiesController.getAllFaculties);
router.get('/sum', facultiesController.getTotalFaculties);
router.get('/:id', facultiesController.getFacultyById); // Route to get a faculty by ID
router.get('/institution/:institution_id', facultiesController.getFacultyByinstutionId); // Route to get a faculty by InstutionID
router.post('/', facultiesController.createFaculty);
router.put('/:id', facultiesController.updateFaculty);
router.delete('/:id', facultiesController.deleteFaculty);

module.exports = router;
