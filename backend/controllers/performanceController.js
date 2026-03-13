const AcademicRecord = require('../models/AcademicRecord');
const { analyzePerformance } = require('../services/aiService');

// @desc    Analyze student marks and identify weak subjects
// @route   POST /api/ai/analyze-performance
// @access  Private/Student
const analyzeAndSavePerformance = async (req, res) => {
  try {
    const { subjects, marks } = req.body;
    
    // Validate input payload which can come from the frontend input form
    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ success: false, message: 'Subjects array is required.' });
    }
    if (!marks || !Array.isArray(marks) || marks.length !== subjects.length) {
      return res.status(400).json({ success: false, message: 'Marks array matching subjects length is required.' });
    }

    // Format for AI Service
    const aiPayload = subjects.map((sub, index) => ({
      name: sub,
      marks: marks[index] || 0
    }));

    // Generate AI Prompt evaluating weak subjects and performance summary
    const analysisResult = await analyzePerformance(aiPayload);
    
    // Check if the user already has a record to update, otherwise create one
    let record = await AcademicRecord.findOne({ userId: req.user.userId });
    
    if (record) {
      // Update existing record
      record.subjects = subjects;
      record.marks = marks;
      record.weakSubjects = analysisResult.weakSubjects || [];
      record.aiAnalysis = analysisResult.summary || "";
      await record.save();
    } else {
      // Create new record
      record = await AcademicRecord.create({
        userId: req.user.userId, 
        subjects: subjects,
        marks: marks,
        weakSubjects: analysisResult.weakSubjects || [],
        aiAnalysis: analysisResult.summary || "",
      });
    }

    res.status(201).json({
      success: true,
      data: record,
      analysis: analysisResult
    });

  } catch (error) {
    console.error('Performance Analysis error:', error);
    res.status(500).json({ success: false, message: 'Server error generating analysis. Ensure OPENROUTER_API_KEY is configured.' });
  }
};

module.exports = {
  analyzeAndSavePerformance
};
