import express from "express";
import userRouter from "./routes/user";
import dotenv from "dotenv";
import connect from "./utils/connectDb";
import { AuthenticateUser } from "./middleware/auth";
import cookieParser = require("cookie-parser");
dotenv.config();

const PORT = process.env.PORT || 8000;
const server = express();

connect(process.env.DB_URL!)
  .then(() => console.log("db connected"))
  .catch((e) => console.log("error occured connecting database"));

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(AuthenticateUser);

server.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});

server.use("/user", userRouter);

server.listen(PORT, () => console.log("Server Started"));
