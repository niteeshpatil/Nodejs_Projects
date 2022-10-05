// console.log("Starting");

// setTimeout(() => {
//   console.log("hello 2 sec time");
// }, 2000);

// setTimeout(() => {
//   console.log("hello 0 sec time");
// }, 0);

// console.log("End");

const request = require("request");
const url =
  "http://api.weatherstack.com/current?access_key=1f5ab46860989bbb0ff8118285f6b919&query=12.9716,77.5946";

request({ url: url }, (error, res) => {
  const data = JSON.parse(res.body);
  console.log(
    data.current.weather_descriptions[0] +
      ". It is " +
      data.current.temperature +
      " degress, It feels like " +
      data.current.feelslike +
      " degress"
  );
  console.log("There is a " + data.current.precip * 100 + "% chance of rain");
});
