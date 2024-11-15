import mongoose from "mongoose";
import { randomBytes, createHmac } from "crypto";
import { generateToken } from "../utils/auth";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "/images/defaultProfile.png",
    },
    salt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
).pre("save", function (next) {
  if (this.isModified("password")) {
    this.salt = randomBytes(16).toString();
    this.password = createHmac("sha256", this.salt)
      .update(this.password)
      .digest("hex");
  }
  next();
});

userSchema.static(
  "validateUser",
  async function (email: string, password: string) {
    const user = await this.findOne({ email });
    if (!user) return null;
    const enteredHashPassword = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    if (enteredHashPassword != user.password) return null;
    return generateToken({
      id: user._id,
      email: user.email,
      profileImage: user.profileImage,
      name: user.name,
    });
  }
);

export default mongoose.model("user", userSchema);
