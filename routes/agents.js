const express = require('express');
const router = express.Router();
const gradesController = require('../controllers/agentsController');

router.get('/', gradesController.getAllAgents);
router.get('/sum', gradesController.getTotalAgents);


module.exports = router;
