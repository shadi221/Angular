const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/getCategories", categoryController.getCategories);

router.get("/getProductsByCategory", categoryController.getCategoriesById);

router.post("/insertCategory", categoryController.insertCategory);

module.exports = router;
