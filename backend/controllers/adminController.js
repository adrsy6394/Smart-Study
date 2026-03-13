const User = require('../models/User');
const AcademicRecord = require('../models/AcademicRecord');
const StudyPlan = require('../models/StudyPlan');

// @desc    Get comprehensive platform analytics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'Student' });
    const totalAdmins = await User.countDocuments({ role: 'Admin' });
    
    const recordsCount = await AcademicRecord.countDocuments();
    const plansCount = await StudyPlan.countDocuments();

    // Calculate system-wide average across all submitted marks
    const allRecords = await AcademicRecord.find({}, 'marks');
    let totalMarks = 0;
    let markCount = 0;

    allRecords.forEach(record => {
      record.marks.forEach(mark => {
        totalMarks += mark;
        markCount++;
      });
    });

    const systemAverage = markCount > 0 ? (totalMarks / markCount).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students: totalStudents,
          admins: totalAdmins
        },
        engagement: {
          analysesPerformed: recordsCount,
          studyPlansGenerated: plansCount,
        },
        performance: {
          systemAverage: parseFloat(systemAverage)
        }
      }
    });
  } catch (error) {
    console.error('Admin Dashboard Error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving dashboard analytics.' });
  }
};

// @desc    Get paginated list of all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().select('-password').skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Admin Get Users Error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving users list.' });
  }
};

module.exports = {
  getDashboardOverview,
  getAllUsers
};
