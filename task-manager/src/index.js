const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("../src/routers/user");
const taskRouter = require("../src/routers/task");

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();
const port = process.env.PORT;

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

// const multer = require("multer");
// const uplode = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("File must be worddoc"));
//     }

//     cb(undefined, true);
//   },
// });

// app.post("/uplode", uplode.single("uplode"), (req, res) => {
//   res.send();
// },(error, req, res, next) => {
//   res.status(400).send({ error: error.message });
// });
