const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));

// let count = 0;

io.on("connection", (socket) => {
  console.log("a user connected");

  //   socket.emit("countUpdated", count);

  //   socket.on("increment", () => {
  //     count++;
  //     //socket.emit("countUpdated", count);
  //     io.emit("countUpdated", count);
  //   });
  socket.emit("msg", "Welcome!");
  // brodecast send msg to all expect current user
  socket.broadcast.emit("msg", "A new user entered");

  socket.on("msgtoall", (msgall) => {
    io.emit("fromany", msgall);
  });

  socket.on("sendLocation", ({ latitude, longitude }) => {
    socket.broadcast.emit(
      "msg",
      `https://google.com/maps?q=${latitude},${longitude}`
    );
  });

  socket.on("disconnect", () => {
    io.emit("msg", "A user left!");
  });
});

server.listen(port, () => {
  console.log("sever listening on port: " + port);
});
