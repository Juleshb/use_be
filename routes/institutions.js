const express = require('express');
const router = express.Router();
const institutionsController = require('../controllers/institutionsController');

router.get('/', institutionsController.getAllInstitutions);
router.get('/:id', institutionsController.getInstitutionById);
router.post('/', institutionsController.createInstitution);
router.put('/:id', institutionsController.updateInstitution);
router.delete('/:id', institutionsController.deleteInstitution);

module.exports = router;
