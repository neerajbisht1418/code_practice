const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/environment');
const { HTTP_STATUS } = require('../constants/appConstants');
const User = require('../models/userModel'); // Assuming you have a User model

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(HTTP_STATUS.UNAUTHORIZED).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;