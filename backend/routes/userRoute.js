const express = require('express');
const { registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.get("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.post("/password/forget",forgetPassword);
router.post("/password/forget",forgetPassword);
router.put("/password/reset/:token",resetPassword);

router.get("/profile",isAuthenticatedUser,getUserDetails);
router.put("/password/update",isAuthenticatedUser,updateUserPassword);
router.put("/profile/update",isAuthenticatedUser,updateUserProfile);

router.get("/admin/users",isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.get("/admin/user/:id",isAuthenticatedUser,authorizeRoles('admin'),getSingleUser);

router.put("/admin/user/:id",isAuthenticatedUser,authorizeRoles('admin'),updateUserRole);
router.delete("/admin/user/:id",isAuthenticatedUser,authorizeRoles('admin'),deleteUser);

module.exports = router;