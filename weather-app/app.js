// console.log("Starting");

// setTimeout(() => {
//   console.log("hello 2 sec time");
// }, 2000);

// setTimeout(() => {
//   console.log("hello 0 sec time");
// }, 0);

// console.log("End");

const request = require("request");
const url1 =
  "http://api.weatherstack.com/current?access_key=1f5ab46860989bbb0ff8118285f6b919&query=12.9716,77.5946";
const url2 =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoibml0ZWVzaC01IiwiYSI6ImNrdmx5eTNrOTA1c3AzMm1veDNvd2U5d3oifQ.FmO9AeGv7cjk6ABxaneVOg&limit=1";

// request({ url: url1, json: true }, (err, res) => {
//   if (err) {
//     console.log("Unable to connect server!");
//   } else if (res.body.error) {
//     console.log("Unable to find location");
//   } else {
//     const data = res.body;
//     console.log(
//       data.current.weather_descriptions[0] +
//         ". It is " +
//         data.current.temperature +
//         " degress, It feels like " +
//         data.current.feelslike +
//         " degress"
//     );
//     console.log("There is a " + data.current.precip * 100 + "% chance of rain");
//   }
// });

request({ url: url2, json: true }, (err, res) => {
  if (err) {
    console.log("Unable to connect server!");
  } else if (res.body.features.length === 0) {
    console.log("Unable to find cordinates");
  } else {
    const data = res.body;
    const Latitude = data.features[0].center[1];
    const Longitude = data.features[0].center[0];

    console.log(
      data.query + "  Longitude: " + Longitude + "  Latitude: " + Latitude
    );
  }
});
