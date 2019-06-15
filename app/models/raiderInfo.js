var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Raiders = sequelize.define("raiders", {
    id: { type: Sequelize.NUMBER,
         primaryKey: true},
    username: Sequelize.STRING,
    email: Sequelize.STRING
});


Raiders.sync();

module.exports = Raiders;