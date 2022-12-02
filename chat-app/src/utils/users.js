const users = [];

// adduser
const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  // Check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  // Validate username
  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  // Store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};
// removeuser

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// getuser
const getUser = (id) => {
  return users.find((user) => user.id === id);
};

// getusersInRoom
const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

// test
// const add = addUser({ id: 22, username: "niteesh", room: "1" });
// const add2 = addUser({ id: 23, username: "niteesh", room: "1" });
// const remov = removeUser(22);
// const res = addUser({ id: 22, username: "", room: "" });
// console.log(add);
// console.log(add2);
// console.log(remov);
// const g = getUser(22);

// console.log(...users);
// console.log(g);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
