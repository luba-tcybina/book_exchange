
var express = require("express");
var mysql = require("mysql2");
// var dotenv = require("dotenv").config();
// var moment = require("moment");
// var axios = require("axios");
// var amazon = require('amazon-product-api');

// Import the API keys
// var keys = require("./keys");

// Initialize the API client using our client id and secret
// var amazonKeys = new Amazon(keys.amazon);

// Create client
// var client = amazon.createClient({
//   awsId: "aws ID",
//   awsSecret: "aws Secret",
//   awsTag: "aws Tag"
// });

var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./app/models/bookInfo");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

require("./app/routes/api-routes")(app);
require("./app/routes/html-routes")(app);



db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


