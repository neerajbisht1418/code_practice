const express = require('express');
const { getExample, createExample, showApiStatus } = require('../controllers/exampleController');
const { validateCreateExample } = require('../validators/exampleValidator');

const router = express.Router();

router.get('/', getExample);
router.get('/status', showApiStatus);
router.post('/', validateCreateExample, createExample);

module.exports = router;