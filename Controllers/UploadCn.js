import { catchAsync, HandleERROR } from "vanta-api";
import fs from "fs";
import { __dirname } from "../app.js";
import Media from "../Models/MediaMd.js";

export const uploadSingle = catchAsync(async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return next(new HandleERROR("", 400));
  }
  await Media.create({ filename: file, userId: req.userId });
  return res.status(200).json({
    success: true,
    message: "",
    data: file.filename,
  });
});

// export const uploadMultiple = catchAsync(async (req, res, next) => {
//   const files = req.files;
//   if (!files || files.length == 0) {
//     return next(new HandleERROR("", 400));
//   }
//   const data = files.map((file) => file.filename);
//   return res.status(200).json({
//     success: true,
//     data,
//     message: "",
//   });
// });

// export const removeData = catchAsync(async (req, res, next) => {
//   const { filename } = req.body;
//   const removeDataFilename = filename.split("/").at(-1);
//   if (fs.existsSync(`${__dirname}/Public/Uploads/${removeDataFilename}`)) {
//     fs.unlinkSync(`${__dirname}/Public/Uploads/${removeDataFilename}`);
//   } else {
//     return next(new HandleERROR("", 404));
//   }
//   return res.status(200).json({
//     success: true,
//     message: "",
//   });
// });
export const removeData = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const media = await Media.findById(id);
  if (!media) {
    return next(new HandleERROR("", 400));
  }
  if (media.userId.toString() != req.userId) {
    return next(new HandleERROR("", 400));
  }
  const removeDataFilename = media.file.filename;
  if (fs.existsSync(`${__dirname}/Public/Uploads/${removeDataFilename}`)) {
    fs.unlinkSync(`${__dirname}/Public/Uploads/${removeDataFilename}`);
  } else {
    return next(new HandleERROR("", 404));
  }
  return res.status(200).json({
    success: true,
    message: "",
  });
});
