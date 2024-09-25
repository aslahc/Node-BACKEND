import { Server as HttpServer } from "http";
import { Server } from "socket.io";

const setupSocketServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.emit("message", "Welcome to the server");

    socket.on("newMessage", (message) => {
      io.emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

export default setupSocketServer;
