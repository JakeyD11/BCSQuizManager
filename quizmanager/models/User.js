import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["edit", "view", "restricted"],
    default: "restricted",
  },
});

export default mongoose?.models?.User || mongoose.model("User", userSchema);
