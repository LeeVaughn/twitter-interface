const express = require("express");
const app = express();
const config = require("./config.js");
const bodyParser = require("body-parser");
const Twit = require("twit");
const T = new Twit(config);
const distanceInWordsToNow = require('date-fns/distance_in_words_to_now');
let user = {};
const count = 5;
const tweets = [];
const friends = [];

// tells express which template engine to use
app.set("view engine", "pug");

// tells express to use bodyParser and where static files are located
app.use(bodyParser.urlencoded({extended: false}));
app.use("/static", express.static("./public"));

// uses Twit to retrieve user data
T.get("account/verify_credentials", (err, data, res, next) => {
  if (err) {
    console.error(err);
  }

  // adds user data to object named "user"
  user = {
    "id": data.id,
    "name": data.name,
    "screenName": data.screen_name,
    "friendsCount": data.friends_count,
    "profileImage": data.profile_image_url,
    "profileBanner": data.profile_banner_url
  }
});

// uses Twit to retrieve data on user's last five tweets
T.get("statuses/user_timeline", {count}, (err, data, response) => {
  if (err) {
    console.error(err);
  }

  // loops through returned data to create an object w/ info on each tweet an adds it to an array
  for (let i = 0; i < count; i++) {
    const tweet = {
      "createdAt": `${distanceInWordsToNow(data[i].created_at)} ago`,
      "content": data[i].text,
      "retweetCount": data[i].retweet_count,
      "favoriteCount": data[i].favorite_count
    }
    tweets.push(tweet);
  }
});

T.get("friends/list", {count}, (err, data, response) => {
  if (err) {
    console.error(err);
  }

  for (let i = 0; i < count; i++) {
    const friend = {
      "name": data.users[i].name,
      "screenName": data.users[i].screen_name,
      "profileImage": data.users[i].profile_image_url
    }
    friends.push(friend);
  }
});

// renders layout.pug to the "/" route
// passes user and tweets as locals
app.get("/", (req, res) => {
  res.render("layout", {user, tweets});
});

// creates server running on localhost:3000
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});