const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoibml0ZWVzaC01IiwiYSI6ImNrdmx5eTNrOTA1c3AzMm1veDNvd2U5d3oifQ.FmO9AeGv7cjk6ABxaneVOg&limit=1";

  request({ url: url, json: true }, (error, res) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (res.body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        Latitude: res.body.features[0].center[1],
        Longitude: res.body.features[0].center[0],
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
