import jwt from "jsonwebtoken";

export const generateToken = function (payload: any) {
  const token = jwt.sign(payload, process.env.JWT_SECRET!);
  return token;
};

export const validateToken = function (token: string) {
  const payload = jwt.verify(token, process.env.JWT_SECRET!);
  return payload;
};
