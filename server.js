
// Import the API keys
// var keys = require("./keys");

var express = require("express");
// var mysql = require("mysql");
var app = express();
var db = require("./app/models");
var PORT = process.env.PORT || 5050;
// var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use(express.static("app/public"));

// require("./app/routes/api-routes")(app);
// require("./app/routes/html-routes")(app);



db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


