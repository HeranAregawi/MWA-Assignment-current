const express = require("express");
const router = express.Router()
const usersController = require("../controllers/users.controller")


router.route("")
    .post(usersController.addOne)

router.route("/login")
    .post(usersController.login)




module.exports = router