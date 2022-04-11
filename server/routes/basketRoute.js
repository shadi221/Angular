const express = require("express");
const router = express.Router();
const basketController = require("../controllers/basketController");

router.get("/getBasket", basketController.getBasket);

router.post("/addToBasket", basketController.insertBasket);

router.get("/deleteBasket", basketController.deleteBasket);

router.post("/updateBasket", basketController.updateBasket);

module.exports = router;
