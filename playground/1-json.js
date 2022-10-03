const fs = require("fs");

const databuff = fs.readFileSync("1-json.json");
const dataJSON = databuff.toString();
const user = JSON.parse(dataJSON);

user.name = "Niteesh";
user.age = 22;

const userJSON = JSON.stringify(user);
fs.writeFileSync("1-json.json", userJSON);
