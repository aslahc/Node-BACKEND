import express from "express";
import productRoutes from "./Routes/productRoutes";
import authRoutes from "./Routes/authRoutes";
import weatherRoutes from "./Routes/weatherRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Logging middleware to capture request body and content type
app.use((req, res, next) => {
  console.log("Request Body:", req.body);
  console.log("Content-Type:", req.get("Content-Type"));
  next();
});
app.use(errorHandler);
// Define route handlers
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.get("/error", (req, res, next) => {
  const error = new Error("This is a simulated error!");
  next(error);
});

app.use(errorHandler);

export default app;
