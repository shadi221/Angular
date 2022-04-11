var mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("project4", "root", "", {
  host: "localhost",
  collate: "utf8_unicode_ci",
  dialect: "mysql",
});

module.exports = sequelize;
