import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, ""],
      required: [true, ""],
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: [true, ""],
      required: [true, ""],
      match: [/^(\+98|0)?9\d{9}$/],
    },
    profilePic: {
      type: [String],
    },
    bio: {
      type: String,
      default: "",
    },
    fullname: {
      type: String,
      required: [true, ""],
    },
    contactIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
