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
const messages = [];
const recipients = [];

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


// uses Twit to retrieve data on the last five people the user followed
T.get("friends/list", {count}, (err, data, response) => {
  if (err) {
    console.error(err);
  }

  // loops through returned data to create an object w/ info on each friend an adds it to an array
  for (let i = 0; i < count; i++) {
    const friend = {
      "name": data.users[i].name,
      "screenName": data.users[i].screen_name,
      "profileImage": data.users[i].profile_image_url
    }
    friends.push(friend);
  }
});

// uses Twit to retrieve data on the user's five most recent direct messages from the last 30 days
T.get("direct_messages/events/list", {count}, (err, data, response) => {
  // this variable will be used in the for loop since the number of returned messages could be less than five
  let length = count;
  // console.log(data.events);
  if (err) {
    console.error(err);
  }
  // if less than five messages are retrieved, sets length to equal the number of messages returned
  if (data.events.length < count) {
    length = data.events.length;
  }

  // loops through returned data to create an object w/ info on each direct message an adds it to an array
  for (let i = 0; i < length; i++) {
     const message = {
      "createdTimestamp": `${distanceInWordsToNow(parseInt(data.events[i].created_timestamp))} ago`,
      "recipientId": data.events[i].message_create.target.recipient_id,
      "senderId": data.events[i].message_create.sender_id,
      "messageData": data.events[i].message_create.message_data.text
    }
    messages.push(message);
    console.log(messages);
  }
});

// renders layout.pug to the "/" route
// passes user, tweets, and friends as locals
app.get("/", (req, res) => {
  res.render("layout", {user, tweets, friends});
});

// creates server running on localhost:3000
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
