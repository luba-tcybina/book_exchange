'use strict';
const Raider = require('./raider');
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    isbn: { type: DataTypes.BIGINT, primaryKey: true },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageurl: DataTypes.STRING,
    pubYear: DataTypes.DATE,
    numPages: DataTypes.INTEGER
  });
  Book.associate = function(models) {
    // associations can be defined here
    
    // // Creates the association between books and owners, in the Collection table
    Book.belongsToMany(models.Raider, {through: models.Collection});
  };

  return Book;
};
