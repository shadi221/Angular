const con = require("../utils/databse");
const Users = require("../models/usersModels");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const SendMessage = require("../utils/returnObToClient");

const Orders = require("../models/ordersModel");
const Basket = require("../models/basketModel");

exports.checkUser = async (req, res, next) => {
  let email = req.query.email;
  let password = req.query.password;

  await Users.findAll({
    where: {
      email: {
        [Op.like]: `%${email}`,
      },
      password: {
        [Op.like]: `%${password}`,
      },
    },
    include: [Orders, Basket],
  })
    .then((Users) => {
      res.send(SendMessage(Users, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 3));
    });
};

exports.checkMail = async (req, res, next) => {
  let email = req.query.email;

  await Users.findAll({
    where: {
      email: {
        [Op.like]: `%${email}`,
      }
    },
    include: [Orders, Basket],
  })
    .then((Users) => {
      res.send(SendMessage(Users, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 3));
    });
};

exports.insertUser = async (req, res, next) => {
  let user = req.body;

  await Users.create(user)
    .then((Users) => {
      res.send(SendMessage(Users, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};

exports.checkSession = async (req, res, next) => {
  let session = req.query.session;

  await Users.findAll({
    where: {
      session: {
        [Op.like]: `%${session}%`,
      },
    },
  })
    .then((Users) => {
      res.send(SendMessage(Users, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 3));
    });
};

exports.getAllUsers = async (req, res, next) => {
  await Users.findAll({
    include: [Orders, Basket],
  })
    .then((Users) => {
      res.send(SendMessage(Users, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 3));
    });
};
