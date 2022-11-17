const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, updatePassword, getAllUser, getSingleUser } = require('../controllers/userController');
const auth = require('../middleware/auth')
const router = express.Router();


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get( auth.isAuthinticated, auth.authorizedUser('admin', 'user'), logout);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').get(resetPassword)
router.route('/password/update').put(auth.isAuthinticated, updatePassword)
router.route('/admin/users')
  .get(auth.isAuthinticated, auth.authorizedUser('admin'), getAllUser)
router.route('/admin/users/:id')
  .get(auth.isAuthinticated, auth.authorizedUser('admin'), getSingleUser)

module.exports = router;