const jwt = require('jsonwebtoken');
const { config } = require('../config');

function requireAdmin(req, res, next) {
  const token = req.cookies.admin_token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    if (!payload || payload.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid session' });
  }
}

module.exports = { requireAdmin };
