const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer token
  if (!token) {return res.status(401).json({ error: 'Access denied, token missing' });}

  try {
    const verified = jwt.verify(token, 'your_jwt_secret_key'); // Use your secret key
    req.user = verified;
    next();
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;
