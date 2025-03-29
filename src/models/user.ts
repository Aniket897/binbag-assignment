import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    bio: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModal = mongoose.model("User", userSchema);

export default userModal;
