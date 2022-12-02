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
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");
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

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.emit(
      "msg",
      genrateMessage(
        user.username,
        `welcome! you are in  ${user.room} chat-room`
      )
    );
    // brodecast send msg to all expect current user
    socket.broadcast
      .to(user.room)
      .emit(
        "msg",
        genrateMessage(user.username, `${user.username} has joined`)
      );

    callback();
  });

  socket.on("msgtoall", (msgall, callback) => {
    const user = getUser(socket.id);
    if (!user) {
      return callback("please regiter to chatroom!");
    }
    const filter = new Filter();

    if (filter.isProfane(msgall)) {
      return callback("Profanity is not allowed!");
    }
    io.to(user.room).emit("msg", genrateMessage(user.username, `${msgall}`));
    callback();
  });

  socket.on("sendLocation", ({ latitude, longitude }, callback) => {
    const user = getUser(socket.id);
    if (!user) {
      return callback("please regiter to chatroom!");
    }
    socket.broadcast
      .to(user.room)
      .emit(
        "sharlocation",
        genratelocation(
          user.username,
          `https://google.com/maps?q=${latitude},${longitude}`
        )
      );

    callback("succesfully");
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "msg",
        genrateMessage(user.username, `${user.username} left chat!`)
      );
    }
  });
});

server.listen(port, () => {
  console.log("sever listening on port: " + port);
});
