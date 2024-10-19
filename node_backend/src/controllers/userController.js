const authService = require('../services/authService');
const logger = require('../utils/logger');
const { HTTP_STATUS } = require('../constants/appConstants');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'All fields are required.' });
    }

    const { user, token } = await authService.registerUser(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    // Properly log the error message
    const errorMessage = error.message || 'An unknown error occurred';
    logger.error(`Error in register controller: ${errorMessage}`);

    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage,success:false });
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Email and password are required.' });
    }

    const { user, token } = await authService.loginUser(email, password);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    logger.error('Error in login controller:', error.message);
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid login credentials.' });
  }
};
