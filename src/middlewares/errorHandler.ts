// src/middlewares/errorHandler.ts
import {
  ValidationError,
  DatabaseError,
  AuthError,
} from "../utils/customErrors";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);

  if (err instanceof ValidationError) {
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err instanceof DatabaseError) {
    return res
      .status(500)
      .json({ success: false, message: "Database error occurred" });
  }

  if (err instanceof AuthError) {
    return res.status(401).json({ success: false, message: err.message });
  }

  res.status(500).json({ success: false, message: "Internal Server Error" });
};
