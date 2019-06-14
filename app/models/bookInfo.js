var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Books = sequelize.define("books", {
    idbooks: Sequelize.NUMBER,
    isbn: Sequelize.NUMBER,
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    genre: Sequelize.STRING,
    description: Sequelize.STRING,
    imageurl: Sequelize.STRING                 //Change Note**Chris said this should just be a string since we're getting info from url. Blobs unnecessary
});


Books.sync();

module.exports = Books;



