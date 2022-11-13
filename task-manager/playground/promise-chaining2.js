require("../src/db/mogoose");

const Task = require("../src/models/task");
// Task.findOneAndDelete("636b49ccb6943f0eb425f3b9")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deletetaskandcounttasks = async (id, type) => {
  const task = await Task.findOneAndDelete(id);

  const total = await Task.countDocuments({ completed: type });

  return total;
};

deletetaskandcounttasks("636b49ccb6943f0eb425f3b9", true)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
