const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains userId, role, email
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized as an admin' });
  }
};

const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Student') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized as a student' });
  }
};

module.exports = { protect, adminOnly, studentOnly };
