const request = require("request");

const forecast = (Latitude, Longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1f5ab46860989bbb0ff8118285f6b919&query=" +
    encodeURIComponent(Latitude) +
    "," +
    encodeURIComponent(Longitude);

  request({ url: url, json: true }, (error, res) => {
    if (error) {
      callback(undefined, "Unable to connect server!");
    } else if (res.body.error) {
      callback(undefined, "Unable to find location");
    } else {
      callback(
        {
          descriptions: res.body.current.weather_descriptions[0],
          temperature: res.body.current.temperature,
          feelslike: res.body.current.feelslike,
        },
        undefined
      );
    }
  });
};

module.exports = forecast;
