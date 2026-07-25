const express = require('express');
const { auditController } = require('../controllers/auditController');

const router = express.Router();

router.post('/audit', auditController);

module.exports = router;
