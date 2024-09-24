const express = require('express');
const router = express.Router();
const { createUser, getUsers, login } = require('../controllers/userController');

router.post('/users', createUser);
router.get('/users', getUsers);
router.post('/login', login);

module.exports = router;
