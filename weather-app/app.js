// console.log("Starting");

// setTimeout(() => {
//   console.log("hello 2 sec time");
// }, 2000);

// setTimeout(() => {
//   console.log("hello 0 sec time");
// }, 0);

// console.log("End");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// geocode("Bangalure", (error, data) => {
//   if (error) {
//     console.log("error: " + error);
//   } else {
//     console.log(
//       data.location +
//         "  Longitude: " +
//         data.Longitude +
//         "  Latitude: " +
//         data.Latitude
//     );
//   }
// });

// forecast("12.9716", "77.5946", (data, err) => {
//   if (err) {
//     console.log("error" + err);
//   } else {
//     console.log(
//       data.descriptions +
//         ". It is " +
//         data.temperature +
//         " degress, It feels like " +
//         data.feelslike +
//         " degress"
//     );
//   }
// });
