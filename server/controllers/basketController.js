const con = require("../utils/databse");
const Basket = require("../models/basketModel");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const SendMessage = require("../utils/returnObToClient");
const Products = require("../models/productsModel");

exports.getBasket = async (req, res, next) => {
  let userId = req.query.userId;
  let done = req.query.done;

  await Basket.findAll({
    where: {
      userId: userId,
      done: done,
    },
    include: [Products],
  })
    .then((Basket) => {
      res.send(SendMessage(Basket, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};

exports.insertBasket = async (req, res, next) => {
  let basket = req.body;

  await Basket.create(basket)
    .then((Basket) => {
      res.send(SendMessage(Basket, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};

exports.deleteBasket = async (req, res, next) => {
  let id = req.query.id;

  await Basket.destroy({
    where: {
      id: id,
    },
  })
    .then((Basket) => {
      res.send(SendMessage(Basket, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};

exports.updateBasket = async (req, res, next) => {
  console.log(req.body);
  await Basket.update(req.body, {
    where: {
      id: req.body.id,
    },
  })
    .then((Orders) => {
      res.send(SendMessage(Orders, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};
