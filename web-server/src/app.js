const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "niteesh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "niteesh",
  });
});

app.get("/products", (req, res) => {
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please Provide Address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      res.send({ error });
    } else {
      let location = data.location;
      forecast(data.Latitude, data.Longitude, (data, error) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({
            forecast: data,
            location: location,
            address: req.query.address,
          });
        }
      });
    }
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "niteesh",
    msg: "we are glade to help",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "niteesh",
  });
});

app.listen(3000, () => {
  console.log("Server is runing on port 3000");
});
