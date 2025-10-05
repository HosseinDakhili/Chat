import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    memberIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    type: {
      type: String,
      enum: ["private", "group", "channel"],
      required: [true, "نوع چت الزامی است (خصوصی، گروه یا کانال)"],
    },
    adminIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    name: {
      type: String,
      required: [true, "نام چت الزامی است"],
    },
    description: {
      type: String,
      default: "",
    },
    pic: {
      type: String,
      default: "",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
