const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/userController');
const auth = require('../middleware/auth')
const router = express.Router();


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get( auth.isAuthinticated, auth.authorizedUser('admin', 'user'), logout);

module.exports = router;