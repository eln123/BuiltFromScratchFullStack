const Sequelize = require("sequelize");
const db = require("../index.js");

const Person = db.define("person", {
  name: {
    type: Sequelize.STRING,

    allowNull: false,
  },
});

module.exports = Person;
