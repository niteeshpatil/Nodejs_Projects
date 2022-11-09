const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users");
const Task = require("./models/task");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const app = express();
const port = 3000;

app.use(express.json());
// automaticaly parses incoming request to json

app.post("/users", (req, res) => {
  //   console.log(req.body);
  //   res.send("testing!");

  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.listen(port, () => {
  console.log("Server is up runing on port" + port);
});
