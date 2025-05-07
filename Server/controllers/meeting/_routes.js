const express = require('express');
const meeting = require('./meeting');
const auth = require('../../middelwares/auth');

const router = express.Router();

router.get('/', meeting.index);

module.exports = router;
