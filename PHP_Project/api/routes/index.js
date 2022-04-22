const express = require("express");
const router = express.Router();
const hikingsRoute = require("./hikings")
const usersRoute = require("./users")


router.use("/hikings", hikingsRoute)

router.use("/users", usersRoute)

module.exports = router