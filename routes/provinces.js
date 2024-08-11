const express = require('express');
const router = express.Router();
const provincesController = require('../controllers/provincesController');

router.get('/', provincesController.getAllProvinces);
router.get('/:id', provincesController.getProvinceById);
router.post('/', provincesController.createProvince);
router.put('/:id', provincesController.updateProvince);
router.delete('/:id', provincesController.deleteProvince);

module.exports = router;
