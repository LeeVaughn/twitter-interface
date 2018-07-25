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

// tells express which template engine to use
app.set("view engine", "pug");

// tells express to use bodyParser and where static files are located
app.use(bodyParser.urlencoded({extended: false}));
app.use("/static", express.static("./public"));

// uses Twit to retrieve user data
T.get("account/verify_credentials", (err, data, res) => {
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
T.get("statuses/user_timeline", {count}, (err, data, res) => {
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
T.get("friends/list", {count}, (err, data, res) => {
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

// uses Twit to retrieve data on the user's five most recent direct messages
T.get("direct_messages/events/list", {count}, (err, data, res) => {
  // this variable will be used in the for loop since the number of returned messages could be less than five
  let length = count;
  
  // if less than five messages are retrieved, sets length to equal the number of messages returned
  if (data.events.length < count) {
    length = data.events.length;
  }
  if (err) {
    console.error(err);
  }

  // loops through returned data to create an object w/ info on each direct message an adds it to an array
  for (let i = 0; i < length; i++) {
    let message = {
      "createdTimestamp": `${distanceInWordsToNow(parseInt(data.events[i].created_timestamp))} ago`,
      "recipientId": data.events[i].message_create.target.recipient_id,
      "senderId": data.events[i].message_create.sender_id,
      "messageData": data.events[i].message_create.message_data.text,
    }

    // uses Twit to retrieve data on the direct message sender
    T.get("users/show", {user_id: message.senderId}, (err, data, res) => {
      if (err) {
        console.error(err);
      }
      // adds sender name and profile image to message object
      message.senderName = data.name;
      message.senderProfileImage = data.profile_image_url;
    });

    // uses Twit to retrieve data on the direct message recipient
    T.get("users/show", {user_id: message.recipientId}, (err, data, res) => {
      if (err) {
        console.error(err);
      }
      // adds recipient name and profile image to message object
      message.recipientName = data.name;
      message.recipientProfileImage = data.profile_image_url;
    });
    messages.push(message);
    // reverses messages array so oldest message renders first
    messages.reverse();
  }
});

// renders layout.pug to the "/" route
// passes user, tweets, friends, and messages as locals
app.get("/", (req, res) => {
  res.render("layout", {user, tweets, friends, messages});
});

// creates server running on localhost:3000
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
