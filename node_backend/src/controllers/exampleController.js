const ExampleService = require('../services/exampleService');
const logger = require('../utils/logger');

exports.getExample = async (req, res, next) => {
  try {
    const result = await ExampleService.getExample();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error('Error in getExample controller:', error);
    next(error);
  }
};

exports.createExample = async (req, res, next) => {
  try {
    const result = await ExampleService.createExample(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    logger.error('Error in createExample controller:', error);
    next(error);
  }
};

exports.showApiStatus = (req, res) => {
  res.status(200).json({ message: 'Hello, database' });
};
