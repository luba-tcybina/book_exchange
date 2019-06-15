// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
var Book = sequelize.define("book", {
    isbn: {type: Sequelize.BIGINT, primaryKey: true},
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    genre: Sequelize.STRING,
    description: Sequelize.STRING,
    imageurl: Sequelize.STRING
});
var Raider = sequelize.define("raider", {
    raider_id: { type: Sequelize.INTEGER, defaultValue: Sequelize.UUIDV1, primaryKey: true, unique: true },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
});
Collection = sequelize.define('collection', { 
    condition: Sequelize.STRING
});

// Creates the association between books and owners, in the Collection table
Book.belongsToMany(Raider, {through: Collection});
Raider.belongsToMany(Book, {through: Collection});


// Syncs with DB
Book.sync();
Raider.sync();
Collection.sync();

// Makes the Book Model available for other files (will also create a table)
module.exports = {
    Book,
    Raider,
    Collection
};