const express = require('express');
const { registerUser, loginUser, logoutUser, forgetPassword, resetPassword } = require('../controllers/userController');
const router = express.Router();

router.get("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.post("/password/forget",forgetPassword);
router.post("/password/forget",forgetPassword);
router.put("/password/reset/:token",resetPassword);

module.exports = router;