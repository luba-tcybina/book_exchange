var path = require("path");


module.exports = function(app) {

    // Main Page

    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, ""));               //   ../public/index.html
    });

    // Login Page
    app.get("/login", function(req, res) {
      res.sendFile(path.join(__dirname, ""));               //   ../public/login.html
    });

    // Add Book Page
    app.get("/add", function(req, res) {
      res.sendFile(path.join(__dirname, ""));               //   ../public/add.html
    });

    // Browse Book Page
    app.get("/browse", function(req, res) {
      res.sendFile(path.join(__dirname, ""));               //   ../public/browse.html
    });


    // Another path for search result when someone is searching for the book they want? 

    // app.get("/result", function(req, res) {
    //   res.sendFile(path.join(__dirname, ""));               //   ../public/result.html
    // });











};