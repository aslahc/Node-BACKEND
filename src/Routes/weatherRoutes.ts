import { Router } from "express";
import { fetchWeatherData } from "../services/cacheService";

// Create an instance of Router to define routes
const router: Router = Router();

// Route to fetch weather data based on city
router.get("/", fetchWeatherData);

export default router;
