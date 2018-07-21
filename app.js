const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Twit = require("twit");
const config = require("./config.js");
const T = new Twit(config);

// tells express which template engine to use
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/static", express.static("./public"));

// creates server running on localhost:3000
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});