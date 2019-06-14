var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Collections = sequelize.define("colletions", {
    idcollections: Sequelize.NUMBER,
    raider_id: Sequelize.NUMBER,
    tome_id: Sequelize.STRING,
    to_trade: Sequelize.STRING,
    condition: Sequelize.STRING
});


Collections.sync();

module.exports = Collections;