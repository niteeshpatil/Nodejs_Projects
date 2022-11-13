const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("../src/routers/user");
const taskRouter = require("../src/routers/task");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();
const port = 3000;

// new middleware

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     return res.send("GET Request are disabled");
//   }
//   next();
// });

// app.use((req, res, next) => {
//   res.status(503).send("website under down");
// });

app.use(express.json());

// automaticaly parses incoming request to json

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up runing on port" + port);
});

// const jwt = require("jsonwebtoken");

// const myFuntion = async () => {
//   const token = await jwt.sign({ _id: "1234" }, "thisismypassword");
//   console.log(token);
//   const data = await jwt.verify(token, "thisismypassword");

//   console.log(data);
// };

// myFuntion();
