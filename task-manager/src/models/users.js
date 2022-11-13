const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const usrSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be +ve");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 6 || value.toLowerCase().includes("password")) {
        throw new Error("Invalid Password");
      }
    },
  },
});

usrSchema.statics.findByIdCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// since biding is there use funtion key word
usrSchema.pre("save", async function (next) {
  const user = this;
  // console.log(user.password);

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // next is called bz to contuine the next program
  next();
});
const User = mongoose.model("User", usrSchema);

module.exports = User;
