import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    file: {
      type: Object,
      required: [true, "فایل الزامی است"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "شناسه‌ی کاربر الزامی است"],
    },
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);
export default Media;
