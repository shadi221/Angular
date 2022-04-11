const con = require("../utils/databse");
const Category = require("../models/categoryModel");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const SendMessage = require("../utils/returnObToClient");

const Products = require("../models/productsModel");

exports.getCategories = async (req, res, next) => {
  await Category.findAll()
    .then((Category) => {
      res.send(SendMessage(Category, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};

exports.getCategoriesById = async (req, res, next) => {
  let id = req.query.id;

  await Category.findAll({
    where: {
      id: id,
    },
    include: [Products],
  })
    .then((Category) => {
      res.send(SendMessage(Category, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};

exports.insertCategory = async (req, res, next) => {
  let category = req.body;

  await Category.create(category)
    .then((Category) => {
      res.send(SendMessage(Category, null, 1));
    })
    .catch((err) => {
      res.send(SendMessage(null, err, 0));
    });
};
