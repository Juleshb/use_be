const express = require('express');
const router = express.Router();
const institutionsController = require('../controllers/institutionsController');
const auth = require('../middleware/auth');

// Protected routes with role-based access
router.get('/', auth(), institutionsController.getAllInstitutions); // Any authenticated user can access
router.get('/:id', auth(), institutionsController.getInstitutionById); // Any authenticated user can access
router.post('/', auth('admin'), institutionsController.createInstitution); // Only admins can create institutions
router.put('/:id', auth('admin'), institutionsController.updateInstitution); // Only admins can update institutions
router.delete('/:id', auth('super-admin'), institutionsController.deleteInstitution); // Only super-admins can delete institutions

module.exports = router;
