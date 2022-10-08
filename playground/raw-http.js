const https = require("https");

url =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/bangalure.json?access_token=pk.eyJ1Ijoibml0ZWVzaC01IiwiYSI6ImNrdmx5eTNrOTA1c3AzMm1veDNvd2U5d3oifQ.FmO9AeGv7cjk6ABxaneVOg&limit=1";

const request = https.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log(error);
});

request.end();
