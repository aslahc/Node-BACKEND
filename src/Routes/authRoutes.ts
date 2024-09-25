import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { body } from "express-validator";

const router = express.Router();

// Registration Route
router.post(
  "/register",
  [
    body("username", "Username is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  registerUser
);

// Login Route
router.post(
  "/login",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  loginUser
);

// Protected Route (Example: Profile)
router.get("/profile", authMiddleware, (req, res) => {
  console.log("user profile");
  res.send("user profile ");
});
router.get("/settings", authMiddleware, (req, res) => {
  res.send("settings ");
});

export default router;
