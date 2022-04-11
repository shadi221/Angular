const Sequelize = require("sequelize");
const sequelize = require("../utils/databse");

const Category = sequelize.define("category", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Category;
