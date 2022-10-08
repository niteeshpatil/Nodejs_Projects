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

const address = process.argv[2];
if (!address) {
  console.log("Please provide address!");
} else {
  geocode(address, (error, data) => {
    if (error) {
      console.log("error: " + error);
    } else {
      console.log(data.location);
      forecast(data.Latitude, data.Longitude, (data, error) => {
        if (error) {
          console.log("error" + error);
        } else {
          console.log(
            data.descriptions +
              ". It is " +
              data.temperature +
              " degress, It feels like " +
              data.feelslike +
              " degress"
          );
        }
      });
    }
  });
}
