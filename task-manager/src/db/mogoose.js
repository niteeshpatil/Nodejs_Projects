const mongoose = require("mongoose");
// const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Invalid email");
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be +ve");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     validate(value) {
//       if (value.length < 6 || value.toLowerCase().includes("password")) {
//         throw new Error("Invalid Password");
//       }
//     },
//   },
// });

// const person = new User({
//   name: "Manju",
//   age: 22,
//   email: "hello@gmail.com",
//   password: "838passwor",
// });

// person
//   .save()
//   .then((res) => {
//     console.log("success");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const Task = mongoose.model("task", {
//   description: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// const firsttask = new Task({
// description: "webdevlopment",
// completed: true,
// });

// firsttask
//   .save()
//   .then((res) => {
//     console.log("success");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
