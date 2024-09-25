import { Request, Response, NextFunction } from "express";
import { createClient } from "redis";
import axios from "axios";

// Define the Redis client
const redisClient = createClient();

// Handle Redis connection errors
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

// Connect to Redis
redisClient.connect();

// Fetch weather data and cache it
export const fetchWeatherData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const city: string = (req.query.city as string) || "London";

  // You can predefine some city coordinates for this example
  const citiesCoordinates: Record<
    string,
    { latitude: number; longitude: number }
  > = {
    London: { latitude: 51.5074, longitude: -0.1278 },
    Paris: { latitude: 48.8566, longitude: 2.3522 },
    NewYork: { latitude: 40.7128, longitude: -74.006 },
    Tokyo: { latitude: 35.6762, longitude: 139.6503 },
  };

  const coordinates = citiesCoordinates[city] || citiesCoordinates["London"];

  try {
    console.log("Fetching weather data...");
    // Try to get data from Redis cache
    const cachedData = await redisClient.get(city);

    if (cachedData) {
      res.status(200).json({ success: true, data: JSON.parse(cachedData) });
      return;
    }

    // If not in cache, fetch from the Open-Meteo public API
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m`
    );

    // Cache the API response in Redis for 10 minutes
    await redisClient.setEx(city, 600, JSON.stringify(response.data));

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    next(error);
  }
};
