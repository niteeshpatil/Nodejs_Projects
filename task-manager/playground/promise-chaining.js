require("../src/db/mogoose");

const User = require("../src/models/users");

// 636b53c9991cab0780631525
// User.findByIdAndUpdate("6365212aefd0c63fc88d833b", { age: 1 })
//   .then((user) => {
//     console.log(user);

//     return User.countDocuments({ age: 1 });
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeandCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {
    age,
  });

  const count = await User.countDocuments({ age: 1 });

  return count;
};

updateAgeandCount("6365212aefd0c63fc88d833b", 2)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
