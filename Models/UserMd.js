import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "نام کاربری وارد شده قبلاً استفاده شده است"],
      index:false
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: [true, "شماره موبایل وارد شده قبلاً ثبت شده است"],
      required: [true, "شماره موبایل الزامی است"],
      match: [/^(\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست"],
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
      required: [true, "نام و نام خانوادگی الزامی است"],
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
