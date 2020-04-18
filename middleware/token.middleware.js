const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const secret = config.get('jwtSecret');
    const payload = jwt.verify(token, secret);
    const user = await User.findOne({ username: payload.username });
    req.user = user;
    next();
  } catch (e) {
    console.log('error :', e);
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired!' });
      return;
    } else {
      res.staus(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  }
};
