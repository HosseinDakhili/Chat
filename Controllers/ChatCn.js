import { catchAsync, HandleERROR } from "vanta-api";
import Chat from "../Models/ChatMd.js";
import Message from "../Models/MessageMd.js";
import fs from "fs";
import { __dirname } from "../app.js";
import Media from "../Models/MediaMd.js";

export const createChat = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { name = "", type = "", pic = "", description = "" } = req.body;
  if (!type || !name || type == "private") {
    return next(new HandleERROR("", 400));
  }
  const chat = await Chat.create({
    name,
    type,
    pic,
    description,
    memberIds: [userId],
    adminIds: [userId],
    ownerId: userId,
  });

  return res.status(200).json({ data: chat, success: true, message: "" });
});

export const getAllChats = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;
  const chats = await Chat.find({
    memberIds: userId,
  }).sort({ updatedAt: -1 });
  return res.status(200).json({
    data: chats,
    success: true,
    message: "",
  });
});

export const getOneChat = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const chat = await Chat.findById(req.params.id);
  if (
    !chat ||
    (chat.type == "private" &&
      !chat.memberIds.find((id) => id.toString() === userId))
  ) {
    return next(new HandleERROR("", 400));
  }

  return res.status(200).json({
    data: chat,
    success: true,
    message: "",
  });
});

export const removeChat = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const chat = await Chat.findById(req.params.id);
  if (
    chat.type != "private" &&
    chat.ownerId.toString() != userId &&
    !chat.memberIds?.find((id) => id.toString() == userId)
  ) {
    return next(new HandleERROR("", 400));
  }
  if (chat?.type == "private") {
    await chat.remove();
    const messages = await Message.deleteMany({ chatId: req.params.id });
    for (let message of messages) {
      if (message.mediaId) {
        const media = await Media.findByIdAndDelete(message.mediaId);
        if (
          fs.existsSync(`${__dirname}/Public/Uploads/${media.file.filename}`)
        ) {
          fs.unlinkSync(`${__dirname}/Public/Uploads/${media.file.filename}`);
        }
      }
    }
  }

  if (chat.ownerId != userId) {
    chat.memberIds = chat.memberIds.filter((id) => id.toString() != userId);
    chat.adminIds = chat.adminIds.filter((id) => id.toString() != userId);
    await chat.save();
  } else {
    await chat.remove();
    const messages = await Message.deleteMany({ chatId: req.params.id });
    for (let message of messages) {
      if (message.mediaId) {
        const media = await Media.findByIdAndDelete(message.mediaId);
        if (
          fs.existsSync(`${__dirname}/Public/Uploads/${media.file.filename}`)
        ) {
          fs.unlinkSync(`${__dirname}/Public/Uploads/${media.file.filename}`);
        }
      }
    }
  }

  return res.status(200).json({
    success: true,
    message: "",
  });
});
