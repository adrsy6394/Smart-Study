const express = require('express');
const router = express.Router();
const { analyzeAndSavePerformance } = require('../controllers/performanceController');
const { generateAndSaveStudyPlan, getStudyPlan } = require('../controllers/studyPlanController');
const { recommendAndGetResources } = require('../controllers/resourceController');
const { protect, studentOnly } = require('../middleware/authMiddleware');

router.post('/analyze-performance', protect, studentOnly, analyzeAndSavePerformance);
router.post('/generate-study-plan', protect, studentOnly, generateAndSaveStudyPlan);
router.get('/study-plan', protect, studentOnly, getStudyPlan);
router.get('/recommend-resources', protect, studentOnly, recommendAndGetResources);

module.exports = router;
