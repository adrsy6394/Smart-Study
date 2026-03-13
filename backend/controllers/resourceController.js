const AcademicRecord = require('../models/AcademicRecord');
const { generateResources } = require('../services/aiService');

// @desc    Get AI recommended learning resources for weak subjects
// @route   GET /api/ai/recommend-resources
// @access  Private/Student
const recommendAndGetResources = async (req, res) => {
  try {
    // Fetch student's academic record to get weak subjects
    const record = await AcademicRecord.findOne({ userId: req.user.userId });
    if (!record || !record.weakSubjects || record.weakSubjects.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'No weak subjects identified yet. Keep up the good work!',
        data: [] 
      });
    }

    // Generate Resources from AI
    const resources = await generateResources(record.weakSubjects);

    res.status(200).json({
      success: true,
      data: resources
    });

  } catch (error) {
    console.error('Resource Recommendation error:', error);
    res.status(500).json({ success: false, message: 'Server error generating resources.' });
  }
};

module.exports = {
  recommendAndGetResources
};
