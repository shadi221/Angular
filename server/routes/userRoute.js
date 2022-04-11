const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/findUser", userController.checkUser);

router.post("/insertUser", userController.insertUser);

router.get("/findSession", userController.checkSession);

router.get("/getAllusers", userController.getAllUsers);

router.get("/checkMail", userController.checkMail);


module.exports = router;
