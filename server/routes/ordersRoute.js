const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.get("/getOrders", ordersController.getOrders);

router.post("/insertOrder", ordersController.insertOrders);

router.post("/updateOrder", ordersController.updateOrders);

router.get("/getAllOrders", ordersController.getAllOrders);

module.exports = router;
