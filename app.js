const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Twit = require("twit");
const config = require("./config.js");
const T = new Twit(config);
const user = {};

// tells express which template engine to use
app.set("view engine", "pug");

// tells express to use bodyParser and where static files are located
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/static", express.static("./public"));

// uses Twit to retrieve user data
T.get("account/verify_credentials", (err, data, res, next) => {
  if (err) {
    console.log(err);
  }

  // adds user data to object named "user"
  user.id = data.id;
  user.name = data.name;
  user.screenName = data.screen_name;
  user.friendsCount = data.friends_count;
  user.profileImage = data.profile_image_url;
  user.profileBanner = data.profile_banner_url;
});

// renders layout.pug to the "/" route
app.get("/", (req, res) => {
  res.render("layout", {user});
});

// creates server running on localhost:3000
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});