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
    socket.emit("msgtoall", msg, (error) => {
      if (error) {
        return console.log(error);
      }
      console.log("the massage was delivered!");
    });
  });

document.querySelector("#share-location").addEventListener("click", () => {
  const loaction = navigator.geolocation;

  if (!loaction) {
    return alert("geolocation is not suported for your browser");
  }

  loaction.getCurrentPosition((Position) => {
    // console.log(Position.coords);
    socket.emit(
      "sendLocation",
      {
        latitude: Position.coords.latitude,
        longitude: Position.coords.longitude,
      },
      (msg) => {
        console.log("location shered with all " + msg);
      }
    );
  });
});
