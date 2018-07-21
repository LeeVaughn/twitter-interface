# Twitter Interface (Work in Progress)

An Express and Pug application that uses Twitter's REST API to access data for a Twitter profile and display it to the user.

## Motivation

This project was created as a part of the Treehouse Full Stack JavaScript Techdegree program.

## Features

* Accesses information on a Twitter account using Twitter's REST API
* Automatically authenticates access to a Twitter profile
* Displays recent tweets, recent friends, and recent direct messages
* Running ```npm install``` installs relevant dependencies

## To Run

* Download project files by running ```git clone https://github.com/LeeVaughn/twitter-interface```
* Navigate to the project folder
* Install dependencies with ```npm install```
* You will need to create your own config.js file using this format:

``` javascript
const T = {
  consumer_key: "zqbzbNOOGD0BmQTPdpzsQgXvH",
  consumer_secret: "15pOnKYQ1aQnBbkyXfHCIMxVam4QIuEBCeGR4C7YWxRS0WKF2H",
  access_token: "913822148761759744-oLkNwLv50DyJkGQfDooNiEilALVCig7",
  access_token_secret: "Z6x9d56W8B8bsYTenivlN1kO4TG2nC4zHOfs4PKQLyKKa",
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
};

module.exports = T;
```

* The config.js file should be saved in the same directory as app.js
* Type ```npm start``` or ```node app.js``` to run application (application runs on localhost:3000)

## Dependencies

* [express](https://www.npmjs.com/package/express) Fast, unopinionated, minimalist web framework for node
* [pug](https://www.npmjs.com/package/pug) A clean, whitespace-sensitive template language for writing HTML
* [Twit](https://www.npmjs.com/package/twit) Twitter API Client for node
* [body-parser](https://www.npmjs.com/package/body-parser) Node.js body parsing middleware

## Links

* Project Homepage - coming soon!
* [Repository](https://github.com/LeeVaughn/twitter-interface)

## Author

[Daniel Lee Vaughn](https://github.com/LeeVaughn)