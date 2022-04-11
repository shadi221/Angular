const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
var multer = require("multer");

var storageObj = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, "../uploads/");
  },
  filename: function (req, file, cb) {
    let dt = new Date().getTime();
    cb(null, String(dt) + file.originalname);
  },
});

var upload = multer({ storage: storageObj });

router.get("/getAllProducts", productsController.getAllProducts);

router.post(
  "/insertProduct",
  upload.array("uploads[]", 12),
  productsController.insertProduct
);


router.post(
  "/updateProduct",
  upload.array("uploads[]", 12),
  productsController.updateProduct
);

router.get("/findProduct", productsController.findProductById);

module.exports = router;
