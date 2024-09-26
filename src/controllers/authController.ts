import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
// import { validationResult } from "express-validator";
import {
  ValidationError,
  AuthError,
  DatabaseError,
} from "../utils/customErrors";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register User
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  // Validate input
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(new ValidationError("Invalid input data"));
  // }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ValidationError("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(error);
    }
    next(new DatabaseError("Failed to register user"));
  }
};

// Login User
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  // Validate input
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(new ValidationError("Invalid input data"));
  // }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthError("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AuthError("Invalid credentials");
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    if (error instanceof AuthError || error instanceof ValidationError) {
      return next(error);
    }
    next(new DatabaseError("Login failed"));
  }
};
