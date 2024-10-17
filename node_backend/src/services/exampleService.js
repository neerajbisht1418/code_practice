const Example = require('../models/exampleModel');
const logger = require('../utils/logger');

const getAllExamples = async () => {
  try {
    return await Example.find();
  } catch (error) {
    logger.error('Error in getAllExamples service:', error);
    throw error;
  }
};

const getExampleById = async (id) => {
  try {
    const example = await Example.findById(id);
    if (!example) {
      throw new Error('Example not found');
    }
    return example;
  } catch (error) {
    logger.error(`Error in getExampleById service for id ${id}:`, error);
    throw error;
  }
};

const createExample = async (exampleData) => {
  try {
    const newExample = new Example(exampleData);
    return await newExample.save();
  } catch (error) {
    logger.error('Error in createExample service:', error);
    throw error;
  }
};

const updateExample = async (id, updateData) => {
  try {
    const updatedExample = await Example.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updatedExample) {
      throw new Error('Example not found');
    }
    return updatedExample;
  } catch (error) {
    logger.error(`Error in updateExample service for id ${id}:`, error);
    throw error;
  }
};

const deleteExample = async (id) => {
  try {
    const deletedExample = await Example.findByIdAndDelete(id);
    if (!deletedExample) {
      throw new Error('Example not found');
    }
    return deletedExample;
  } catch (error) {
    logger.error(`Error in deleteExample service for id ${id}:`, error);
    throw error;
  }
};

module.exports = {
  getAllExamples,
  getExampleById,
  createExample,
  updateExample,
  deleteExample
};