const Sequelize = require("sequelize");
const sequelize = require("../utils/databse");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  personal_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  type: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  session: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
});
module.exports = User;
