const express = require("express");
const router = express.Router();
const hikingController = require("../controllers/hikings.controller");
const placesController = require("../controllers/places.controller");
const authController = require("../controllers/authentication.controller")

router.route("")
    .get(hikingController.getAll)
    .post(authController.authenticate, hikingController.addOne)
    
router.route("/search")
    .get(hikingController.getHikingByTypeOfPlace)

router.route("/:hiking_Id")
    .get(hikingController.getOne)
    .delete(hikingController.deleteOne)
    .put(hikingController.fullUpdateOne)
    .patch(hikingController.partialUpdate)


router.route("/:hiking_Id/places")
    .get(placesController.getAll)
    .put(placesController.addOne)

router.route("/:hiking_Id/places/:place_Id")
    .get(placesController.getOne)
    .delete(placesController.deleteOne)
    .put(placesController.fullUpdatePlace)
    .patch(placesController.partialUpdatePlace)


module.exports = router;