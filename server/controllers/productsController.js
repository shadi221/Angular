const con = require("../utils/databse");
const Products = require("../models/productsModel");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const SendMessage = require("../utils/returnObToClient");

exports.getAllProducts = async (req, res, next) => {
  await Products.findAll()
    .then((Products) => {
      res.send(SendMessage(Products, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};

exports.insertProduct = async (req, res, next) => {
  let product = req.body;
  product.img = req.files[0].filename;

  await Products.create(product)
    .then((Products) => {
      res.send(SendMessage(Products, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};

exports.findProductById = async (req, res, next) => {
  let id = req.query.id;

  await Products.findAll({
    where: {
      id: id,
    },
  })
    .then((Products) => {
      res.send(SendMessage(Products, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};



exports.updateProduct = async (req, res, next) => {
  let product = req.body;

  await Products.update(product, {
    where: {
      id: product.id,
    },
  })
    .then((Products) => {
      res.send(SendMessage(Products, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};
