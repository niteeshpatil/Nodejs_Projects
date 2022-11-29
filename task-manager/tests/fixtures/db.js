const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/users");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "teesh",
  email: "teeshgpatil@gmail.com",
  password: "niteesh",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECREATE),
    },
  ],
};

const usersecondId = new mongoose.Types.ObjectId();
const secondOne = {
  _id: usersecondId,
  name: "sateesh",
  email: "sateeshgpatil@gmail.com",
  password: "sateesh",
  tokens: [
    {
      token: jwt.sign({ _id: usersecondId }, process.env.JWT_SECREATE),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "game",
  completed: false,
  owner: userOneId,
};

const tasktwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "game",
  completed: true,
  owner: userOneId,
};

const taskthree = {
  _id: new mongoose.Types.ObjectId(),
  description: "game",
  completed: true,
  owner: usersecondId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(secondOne).save();
  await new Task(taskOne).save();
  await new Task(tasktwo).save();
  await new Task(taskthree).save();
};

module.exports = {
  userOne,
  userOneId,
  secondOne,
  usersecondId,
  setupDatabase,
  taskthree,
  tasktwo,
};
