import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/auth";

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = validateToken(req.cookies["bearer-token"]) as Request["user"];
    req.user = user;
  } catch (e) {}
  next();
};
