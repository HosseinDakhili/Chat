import ApiFeatures, { catchAsync } from "vanta-api";
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


