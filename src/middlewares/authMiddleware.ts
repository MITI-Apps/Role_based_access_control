import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided."
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token){
        return res.status(401).json({
        message: "No token provided."
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    (req as any).user = decoded;

    next();
  } catch (error) {
    logger.error("Token verification failed", { error });
    return res.status(401).json({
      message: "Invalid token."
    });
  }
};