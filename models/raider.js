// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt");
const Book = require('./book');
// Creating our Raider model
module.exports = function(sequelize, DataTypes) {
  var Raider = sequelize.define("Raider", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our Raider model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Raider.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the Raider Model lifecycle
  // In this case, before a Raider is created, we will automatically hash their password
  Raider.beforeCreate(user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});
Raider.associate = function(models) {
  // associations can be defined here

  // // Creates the association between books and owners, in the Collection table
Raider.belongsToMany(models.Book, {through: models.Collection});
};
  return Raider;
};
