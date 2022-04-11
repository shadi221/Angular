const express = require("express");
const app = express();
const port = 5000;
var path = require("path");
app.use(express.static(path.join(__dirname, "../uploads")));

const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("./models/usersModels");

const Products = require("./models/productsModel");

const Orders = require("./models/ordersModel");

const Basket = require("./models/basketModel");

const Category = require("./models/categoryModel");

const Sequelize = require("sequelize");
const sequelize = require("./utils/databse");
const Op = Sequelize.Op;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204.
};

app.use(cors(corsOptions));

const ManagerRoute = require("./routes/userRoute");
app.use(ManagerRoute);

const ProductsRoute = require("./routes/productsRoute");
app.use(ProductsRoute);

const CategoryRoute = require("./routes/categoryRoute");
app.use(CategoryRoute);

const BasketRoute = require("./routes/basketRoute");
app.use(BasketRoute);

const OrdersRoute = require("./routes/ordersRoute");
app.use(OrdersRoute);

User.hasMany(Orders, { foreignKey: { name: "userId" } });
User.hasMany(Basket, { foreignKey: { name: "userId" } });

Category.hasMany(Products, { foreignKey: { name: "categoryId" } });
Basket.belongsTo(Products, { foreignKey: { name: "productId" } });

Orders.belongsTo(Basket, { foreignKey: { name: "basketId" } });

sequelize
  .sync()
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
