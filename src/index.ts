import connectDB from "./config/db";
import dotenv from "dotenv";
import app from "./app";
import http from "http";
import setupSocketServer from "./socket/socket";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);
  setupSocketServer(server);

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
