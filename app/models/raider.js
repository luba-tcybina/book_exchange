'use strict';
const Book = require('./book');
module.exports = (sequelize, DataTypes) => {
  const Raider = sequelize.define('Raider', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Raider.associate = function(models) {
    // associations can be defined here

    // // Creates the association between books and owners, in the Collection table
  Raider.belongsToMany(models.Book, {through: models.Collection});
  };

  return Raider;
};
