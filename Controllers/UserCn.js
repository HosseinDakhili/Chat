import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import bcryptjs from "bcryptjs";
import User from "../Models/UserMd.js";

export const getOneUser = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.role)
    .addManualFilters({ _id: req.userId })
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .populate({ path: "contactIds", select: "phoneNumber fullname username" });
  const result = features.execute();
  res.status(200).json(result);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { password = null, ...otherData } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return next(new HandleERROR("", 400));
  if (password) {
    user.password = bcryptjs.hashSync(password, 12);
  }
  Object.assign(user, otherData);
  const updatedUser = await user.save();
  return res.status(200).json({
    success: true,
    data: updateUser,
  });
});

export const removeUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) return next(new HandleERROR("", 400));
  await user.remove();
  return res.status(200).json({
    success: true,
    data: null,
  });
});
 