const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const Filter = require("bad-words");
const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");
const { genrateMessage, genratelocation } = require("./utils/messages");

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
  socket.emit("msg", genrateMessage("Welcome!"));
  // brodecast send msg to all expect current user
  socket.broadcast.emit("msg", genrateMessage("A new user entered"));

  socket.on("msgtoall", (msgall, callback) => {
    const filter = new Filter();

    if (filter.isProfane(msgall)) {
      return callback("Profanity is not allowed!");
    }
    io.emit("msg", genrateMessage(msgall));
    callback();
  });

  socket.on("sendLocation", ({ latitude, longitude }, callback) => {
    socket.broadcast.emit(
      "sharlocation",
      genratelocation(`https://google.com/maps?q=${latitude},${longitude}`)
    );

    callback("succesfully");
  });

  socket.on("disconnect", () => {
    io.emit("msg", genrateMessage("A user left!"));
  });
});

server.listen(port, () => {
  console.log("sever listening on port: " + port);
});
