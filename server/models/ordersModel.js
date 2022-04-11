const Sequelize = require("sequelize");
const sequelize = require("../utils/databse");

const Orders = sequelize.define("orders", {
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
  basketId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  total_price: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  address_city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address_street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  card: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ispaid: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
});
module.exports = Orders;
