const StudyPlan = require('../models/StudyPlan');
const AcademicRecord = require('../models/AcademicRecord');
const { generateStudyPlan } = require('../services/aiService');

// @desc    Generate and save a weekly study plan
// @route   POST /api/ai/generate-study-plan
// @access  Private/Student
const generateAndSaveStudyPlan = async (req, res) => {
  try {
    const { dailyHours } = req.body;
    
    // Validate preferences
    if (!dailyHours || isNaN(dailyHours) || dailyHours <= 0 || dailyHours > 24) {
      return res.status(400).json({ success: false, message: 'A valid dailyHours number (1-24) is required.' });
    }

    // Fetch student's academic record
    const record = await AcademicRecord.findOne({ userId: req.user.userId });
    if (!record) {
      return res.status(404).json({ success: false, message: 'Academic record not found. Please analyze performance first.' });
    }

    // Generate Study Plan from AI
    const planResult = await generateStudyPlan(record, { dailyHours });
    
    // Check if the user already has a study plan to update, otherwise create one
    let studyPlan = await StudyPlan.findOne({ userId: req.user.userId });
    
    if (studyPlan) {
      studyPlan.title = planResult.title || 'Weekly Study Plan';
      studyPlan.days = planResult.days || [];
      studyPlan.generalTips = planResult.generalTips || [];
      await studyPlan.save();
    } else {
      studyPlan = await StudyPlan.create({
        userId: req.user.userId,
        title: planResult.title || 'Weekly Study Plan',
        days: planResult.days || [],
        generalTips: planResult.generalTips || [],
      });
    }

    res.status(201).json({
      success: true,
      data: studyPlan
    });

  } catch (error) {
    console.error('Study Plan Generation error:', error);
    res.status(500).json({ success: false, message: 'Server error generating study plan.' });
  }
};

// @desc    Get the student's current study plan
// @route   GET /api/ai/study-plan
// @access  Private/Student
const getStudyPlan = async (req, res) => {
  try {
    const studyPlan = await StudyPlan.findOne({ userId: req.user.userId });
    if (!studyPlan) {
        // Return 200 with no data rather than 404 — a missing plan is a normal state, not an error
        return res.status(200).json({ success: true, data: null });
    }
    res.status(200).json({
      success: true,
      data: studyPlan
    });
  } catch (error) {
    console.error('Get Study Plan error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving study plan.' });
  }
}

module.exports = {
  generateAndSaveStudyPlan,
  getStudyPlan
};
