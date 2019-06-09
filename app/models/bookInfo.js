var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Book = sequelize.define("books", {
    idbooks: Sequelize.NUMBER,
    isbn: Sequelize.NUMBER,
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    genre: Sequelize.STRING,
    description: Sequelize.STRING,
    imageurl: Sequelize.STRING                 //Change Note**Chris said this should just be a string since we're getting info from url. Blobs unnecessary
});

var Collections = sequelize.define("colletions", {
    idcollections: Sequelize.NUMBER,
    raider_id: Sequelize.NUMBER,
    tome_id: Sequelize.STRING,
    to_trade: Sequelize.STRING,
    condition: Sequelize.STRING
});

var Raiders = sequelize.define("raiders", {
    id: Sequelize.NUMBER,
    username: Sequelize.STRING,
    email: Sequelize.STRING
});


Book.sync();
Collections.sync();
Raiders.sync();

module.exports = Books;
module.exports = Collections;
module.exports = Raiders;

