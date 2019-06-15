// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
// require("dotenv").config();
var express = require("express");
// var moment = require("moment");
// var axios = require("axios");
// var sequelize = require('sequelize');

// Adding Passport code
// var passport = require('passport');
// var Strategy = require('passport-local').Strategy;

// Import the API keys
// var keys = require("./keys");

// Initialize the API client using our client id and secret
// var google = new Amazon(keys.googleBooks);



var express = require("express");
// var mysql = require("mysql");
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./app/models");
// Enable fixtures to load data from file
const sequelize_fixtures = require('sequelize-fixtures');
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use(express.static("app/public"));

// require("./app/routes/api-routes")(app);
// require("./app/routes/html-routes")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true, logging: console.log  })
.then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
}).then(function () { 
  return sequelize_fixtures.loadFile('./seeds.json', db)

 })
.then(function(){
  console.log("data loaded");
});

