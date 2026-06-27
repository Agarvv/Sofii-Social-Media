import { Request, Response, NextFunction, RequestHandler } from "express";
import JwtHelper from "@helpers/JwtHelper";


declare module "express-serve-static-core" {
  interface Request {
    account?: any;
  }
}

const authMiddleware: RequestHandler = (req, res, next) => {
  const jwtToken = req.cookies?.jwt;

  if (!jwtToken) {
    return res.status(401).json({
      error: "Please log in.",
    });
  }

  try {
    const decoded = JwtHelper.verifyToken(jwtToken);

    req.account = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Please log in.",
    });
  }
};

export default authMiddleware;