const express = require("express");
const app = express();
const config = require("./config.js");
const bodyParser = require("body-parser");
const Twit = require("twit");
const moment = require("moment");
const distanceInWordsToNow = require('date-fns/distance_in_words_to_now');
const T = new Twit(config);
const user = {};
const count = 5;
const tweets = [];

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
  user.id = data.id;
  user.name = data.name;
  user.screenName = data.screen_name;
  user.friendsCount = data.friends_count;
  user.profileImage = data.profile_image_url;
  user.profileBanner = data.profile_banner_url;
});

// uses Twit to retrieve data on user's last five tweets
T.get("statuses/user_timeline", {count}, function (err, data, response) {
  if (err) {
    console.error(err);
  }
  // loops through returned data to create an object w/ info on each tweet an adds it to an array
  for (let i = 0; i < count; i++) {
    const tweet = {};

    tweet.createdAt = `${distanceInWordsToNow(data[i].created_at)} ago`;
    tweet.content = data[i].text;
    tweet.retweetCount = data[i].retweet_count;
    tweet.favoriteCount = data[i].favorite_count;

    tweets.push(tweet);
  }
  console.log(tweets);
});

// renders layout.pug to the "/" route
// passes user as a local
app.get("/", (req, res) => {
  res.render("layout", {
    user
  });
});

// creates server running on localhost:3000
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});