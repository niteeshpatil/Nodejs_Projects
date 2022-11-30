const socket = io();

// socket.on("countUpdated", (count) => {
//   console.log("count updated" + count);
// });

// document.querySelector("#increment").addEventListener("click", () => {
//   console.log("cliked");

//   socket.emit("increment");
// });

socket.on("msg", (msg) => {
  console.log(msg);
});

socket.on("fromany", (msg) => {
  console.log(msg);
});

document
  .querySelector("#msgtoall")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    msg = event.target.elements.msg.value;
    socket.emit("msgtoall", msg);
  });
