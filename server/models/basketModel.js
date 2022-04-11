const Sequelize = require("sequelize");
const sequelize = require("../utils/databse");

const Basket = sequelize.define("basket", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  qnt: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  done: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
});
module.exports = Basket;
