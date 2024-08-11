const jwt = require('jsonwebtoken');

const auth = (requiredRole = null) => (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request object

    // If a specific role is required, check it
    if (requiredRole && req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Access denied: insufficient permissions' });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth;
