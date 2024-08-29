const express = require('express');
const router = express.Router();
const agentsController = require('../controllers/agentsController');

router.get('/', agentsController.getAllAgents);
router.get('/sum', agentsController.getTotalAgents);
router.get('/pagination', agentsController.getAllagentswithpagnation);
router.get('/search', agentsController.getAllagentsWithPaginationsearch);  
//router.get('/:matricule', agentsController.getStudentBymatricule); 



module.exports = router;
