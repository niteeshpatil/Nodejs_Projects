const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("../src/routers/user");
const taskRouter = require("../src/routers/task");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const app = express();
const port = 3000;

app.use(express.json());

// automaticaly parses incoming request to json

// const router = new express.Router();
// router.get("/test", (req, res) => {
//   res.send("I am new router");
// });
// app.use(router);

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up runing on port" + port);
});
