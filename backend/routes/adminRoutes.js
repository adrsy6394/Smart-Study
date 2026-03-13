const express = require('express');
const router = express.Router();
const { getDashboardOverview, getAllUsers } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, adminOnly, getDashboardOverview);
router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;
