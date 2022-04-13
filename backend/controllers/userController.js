const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a sample public ID",
      url: "This is a image URL",
    },
  });
  sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if Email and Password Exists
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Please Enter Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Please Enter Email or Password", 401));
  }

  sendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Forgot Password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //Get Reset Password Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/user/password/reset/${resetToken}`;

  const message = `Your password reset Link is :- \n\n ${resetPasswordUrl}\n\n If you have not requested this email, then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message: message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Password Token Expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password mismatch", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});


//Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success:true,
    user
  })
});

//Update User Password
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Incorrect", 400));
  }

  if( req.body.newPassword !== req.body.confirmPassword ){
    return next(new ErrorHandler("Password doesn't match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//Update User Profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  
  const newUserData = {
    name:req.body.name,
    email:req.body.email,
  }

  //We will add cloudinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:true
  })

  await user.save();
  
  res.status(200).json({
    success:true,
    message:"Profile updated successfully"
  })
});

//Get All Users --> Admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success:true,
    users
  })
});

//Get Single User --> Admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHandler(`User doesn't exist with the id : ${req.params.id}`, 400))
  }
  res.status(200).json({
    success:true,
    user
  })
});


//Update User Role -> Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  
  const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  }

  //We will add cloudinary later

  const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:true
  })

  await user.save();
  
  res.status(200).json({
    success:true,
    message:"Profile updated successfully"
  })
});


//Delete User -> Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`User doesn't exist with the Id : ${req.params.id}`, 400))
  }

  //We will remove cloudinary 

  await user.remove();
  
  res.status(200).json({
    success:true,
    message:"User deleted successfully"
  })
});
