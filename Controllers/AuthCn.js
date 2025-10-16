import { catchAsync, HandleERROR } from "vanta-api";
import { sendAuthCode, verifyCode } from "../Utils/SmsHandler.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../Models/UserMd.js";

export const auth = catchAsync(async (req, res, next) => {
  const { phoneNumber = null } = req.body;
  if (!phoneNumber) {
    return next(new HandleERROR("", 400));
  }
  const regexPhone = new RegExp(/^(\+98|0)?9\d{9}$/);
  if (!regexPhone.test(phoneNumber)) {
    return next(new HandleERROR("", 400));
  }
  const smsResult = await sendAuthCode(phoneNumber);
  if (!smsResult.success) {
    return next(new HandleERROR("", 500));
  }
  return res.status(200).json({
    success: true,
    message: "",
  });
});

export const loginWithOtp = catchAsync(async (req, res, next) => {
  const { phoneNumber = null, code = null } = req.body;
  if (!phoneNumber || !code) {
    return next(new HandleERROR("", 400));
  }
  const smsResult = await verifyCode(phoneNumber, code);
  if (!smsResult.success) {
    return next(new HandleERROR("", 400));
  }
  const user = await User.findOne({ phoneNumber });
  let newUser;
  if (!user) {
    newUser = await user.create({ phoneNumber });
  } else {
    newUser = user;
  }
  const havePassword = newUser?.password ? true : false;
  const token = jwt.sign(
    { id: newUser._id, confirmPassword: !havePassword },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    success: true,
    data: {
      user: !havePassword ? newUser : null,
      token,
    },
    existPassword: havePassword,
    message: "",
  });
});

export const loginWithPassword = catchAsync(async (req, res, next) => {
  const { password = null } = req.body;
  const userId = req.userId;
  if (!password) {
    return next(new HandleERROR("", 400));
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return next(new HandleERROR("", 400));
  }
  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch) {
    return next(new HandleERROR("", 400));
  }
  const token = jwt.sign(
    { id: userId, confirmPassword: true },
    process.env.JWT_SECRET
  );
  return res.status(200).json({
    success: true,
    data: {
      user,
      token,
    },
    message: "",
  });
});

export const resendCode = catchAsync(async (req, res, next) => {
  const { phoneNumber = null } = req.body;
  if (!phoneNumber) {
    return next(new HandleERROR("", 400));
  }
  const regexPhone = new RegExp(/^(\+98|0)?9\d{9}$/);
  if (!regexPhone.test(phoneNumber)) {
    return next(new HandleERROR("", 400));
  }
  const smsResult = await sendAuthCode(phoneNumber);
  if (!smsResult.success) {
    return next(new HandleERROR("", 400));
  }
  return res.status(200).json({
    success: true,
    message: "",
  });
});

