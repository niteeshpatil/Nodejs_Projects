const socket = io();

// socket.on("countUpdated", (count) => {
//   console.log("count updated" + count);
// });

// document.querySelector("#increment").addEventListener("click", () => {
//   console.log("cliked");

//   socket.emit("increment");
// });

const $messageForm = document.querySelector("#msgtoall");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $locationbtn = document.querySelector("#share-location");
const $messages = document.querySelector("#messages");
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;

// options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on("msg", (msg) => {
  console.log(msg);
  const html = Mustache.render(messageTemplate, {
    username: msg.username,
    msg: msg.text,
    cratedAt: moment(msg.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("sharlocation", (location) => {
  console.log(location);
  const html = Mustache.render(locationTemplate, {
    username: location.username,
    url: location.url,
    cratedAt: moment(location.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");
  msg = event.target.elements.msg.value;
  socket.emit("msgtoall", msg, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log("the massage was delivered!");
  });
});

$locationbtn.addEventListener("click", () => {
  const loaction = navigator.geolocation;

  if (!loaction) {
    return alert("geolocation is not suported for your browser");
  }
  $locationbtn.setAttribute("disabled", "disabled");
  loaction.getCurrentPosition((Position) => {
    // console.log(Position.coords);
    socket.emit(
      "sendLocation",
      {
        latitude: Position.coords.latitude,
        longitude: Position.coords.longitude,
      },
      (msg) => {
        $locationbtn.removeAttribute("disabled");
        console.log("location shered with all " + msg);
      }
    );
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    location.href = "/";
    alert(error);
  }
});
