import { Router } from "express";
import {
  formattedErrorsMessage,
  userLoginValidator,
  userSigninValidator,
} from "../utils/validation";
import User from "../models/User";

const userRouter = Router();

userRouter.post("/create-user", async (req, res) => {
  console.log(req.body);
  const userData = userSigninValidator.safeParse(req.body);
  if (!userData.success) {
    res.status(400).json({
      message: formattedErrorsMessage(userData),
    });
    return;
  }

  await User.create(userData.data);
  const token = await (User as any).validateUser(
    userData.data.email,
    userData.data.password
  );
  res.cookie("bearer-token", token).json({ message: "User is created" });
});

userRouter.post("/login", async (req, res) => {
  const userData = userLoginValidator.safeParse(req.body);
  if (!userData.success) {
    res.status(400).json({
      message: formattedErrorsMessage(userData),
    });
    return;
  }
  const token = await (User as any).validateUser(
    userData.data.email,
    userData.data.password
  );

  if (!token) {
    res.status(401).json({ message: "Invalid Data Provided" });
    return;
  }

  res
    .cookie("bearer-token", token)
    .json({ message: "User logged in successfully" });
});

userRouter.get("/logout", (req, res) => {
  res
    .clearCookie("bearer-token")
    .json({ message: "User logged out successfully" });
});

userRouter.get("/");

export default userRouter;
