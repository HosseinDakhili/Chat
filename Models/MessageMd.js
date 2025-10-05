import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: [true, "شناسه‌ی چت الزامی است"],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "شناسه‌ی فرستنده الزامی است"],
    },
    type: {
      type: String,
      enum: ["text", "image", "video", "file", "audio"],
      required: [true, "نوع پیام الزامی است (متن، تصویر، ویدیو، فایل یا صوت)"],
    },
    content: {
      type: String,
      required: [true, "محتوای پیام نمی‌تواند خالی باشد"],
    },
    status: {
      type: String,
      enum: ["sent", "seen"],
      default: "sent",
    },
    mediaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
