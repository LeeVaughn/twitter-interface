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

```const T = new Twit({
    consumer_key: "...",
    consumer_secret: "...",
    access_token: "...",
    access_token_secret: "...",
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
  })

  module.exports = config;```

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