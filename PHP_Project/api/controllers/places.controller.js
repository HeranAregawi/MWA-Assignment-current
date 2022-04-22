const mongoose = require("mongoose");
const Hiking = mongoose.model(process.env.HIKING_MODEL);
let response = {
    status: process.env.HTTP_STATUS_OK,
    message: {}
}

const getAll = function (req, res) {
    console.log("Get All Places controller");
    const hiking_Id = req.params.hiking_Id;
    Hiking.findById(hiking_Id).select("places")
        .exec()
        .then((hikingPlaces) => {
            console.log(hikingPlaces);
            _onSuccessfullGetPlaces(hikingPlaces, response)
            // return hikingPlaces
        })
        // .then((hikingPlaces) => {
        //     if (!hikingPlaces) {
        //         _HikingNotFound(hikingPlaces, response)
        //     }
        // })

        .catch((err) => {
            _handleError(err, response)
        })

    _onSuccessfullGetPlaces = function (message, response) {
        response.status = process.env.HTTP_STATUS_OK
        response.message = message
        _sendResponse(res, response)
    }
    _HikingNotFound = function (message, response) {
        response.status = process.env.HTTP_STATUS_NOT_FOUND
        response.message = "Hiking ID can not found!"
        _sendResponse(res, response)
    }
    _handleError = function (message, response) {
        response.status = process.env.HTTP_STATUS_INTERNAL_ERROR
        response.message = message
        _sendResponse(res, response)
    }
    _sendResponse = function (res, response) {
        res.status(response.status).json(response.message)
    }
}
const getOne = function (req, res) {
    console.log("get one place controller");
    const { place_Id } = req.params;
    const { hiking_Id } = req.params;
    Hiking.find({ _id: hiking_Id, "places._id": place_Id })
        .exec()
        .then((hikingPlace) => {
            _onSuccessfulGetPlace(hikingPlace, response)
        }).then((hikingPlace) => {
            if (!hikingPlace) {
                _hikingNotFound(hikingPlace, response)
            }
        })
        .catch((err) => _handleError(err, response))

    _onSuccessfulGetPlace = function (message, response) {
        response.status = process.env.HTTP_STATUS_OK
        response.message = message
        _sendResponse(res, response)
    }
    _hikingNotFound = function (message, response) {
        response.status = process.env.HTTP_STATUS_NOT_FOUND
        response.message = "Hiking not found"
        _sendResponse(res, response)
    }
    _handleError = function (message, response) {
        response.status = message
        response.message = "Error finding hiking"
    }
    _sendResponse = function (res, response) {
        res.status(response.status).json(response.message)
    }

}

const addOne = function (req, res) {
    const { hiking_Id } = req.params;
    Hiking.findByIdAndUpdate({ _id: hiking_Id }, { $push: { places: req.body.places } })
        .exec()
        .then((hiking) => {
            _onSuccessfulPlaceCreation(hiking, response)
            return hiking
        })
        .then((hiking) => {
            if (!hiking) {
                _hikingNotFound(hiking, response)
            }
        })
        .catch((err) => _handleError(err, response))

    _onSuccessfulPlaceCreation = function (message, response) {
        response.status = process.env.HTTP_STATUS_OK
        response.message = "Place created successfully"
        _sendResponse(res, response)
    }
    _hikingNotFound = function (message, response) {
        response.status = process.env.HTTP_STATUS_NOT_FOUND
        response.message = "Hiking cannot found"
        _sendResponse(res, response)
    }
    _handleError = function (message, response) {
        response.status = process.env.HTTP_STATUS_INTERNAL_ERROR
        response.message = "Error finding hiking"
    }
    _sendResponse = function (res, response) {
        res.status(response.status).json(response.message)
    }

    // Hiking.findByIdAndUpdate({ _id: hiking_Id }, { $push: { places: req.body.places } }).exec((err, hiking) => {
    //     const response = { status: process.env.HTTP_STATUS_OK, message: "Place created successfully" };

    //     if (err) {
    //         console.log("Error finding hiking");
    //         response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
    //         response.message = "Error finding hiking";

    //     }
    //     else if (!hiking) {
    //         console.log("Error finding hiking");
    //         response.status = process.env.HTTP_STATUS_NOT_FOUND;
    //         response.message = "hiking cannot found";
    //     }

    //     res.status(res.statusCode).json(response.message);

    // });
}

const deleteOne = function (req, res) {
    console.log("delete place controller");
    const { hiking_Id, place_Id } = req.params;

    Hiking.updateOne({ _id: hiking_Id }, { $pull: { _id: place_Id } })
        .exec()
        .then((message) => _onSuccessfulDeletePlace(message, response))
        .catch((err) => _handleError(err, response))
    _onSuccessfulDeletePlace = function (message, response) {
        response.status = process.env.HTTP_STATUS_NO_CONTENT
        response.message = "Place deleted successfully"
        _sendResponse(res, response)
    }
    _sendResponse = function (res, response) {
        res.status(response.status).json(response.message)
    }
}

const fullUpdatePlace = function (req, res) {
    console.log("fullUpdate hiking controller");
    _updateOne(req, res, _replaceOneCallback);

}
const partialUpdatePlace = function (req, res) {
    console.log("partialUpdate place Controller");
    _updateOne(req, res, _partialUpdateCallback);
}

const _updateOne = function (req, res, replaceHikingCallback) {
    console.log(" _updateOne controller");
    const { hiking_Id } = req.params;
    const { place_Id } = req.params;
    isValid = mongoose.isValidObjectId(hiking_Id) && mongoose.isValidObjectId(place_Id);
    if (isValid) {
        Hiking.findById(hiking_Id).select("places")
            .exec()
            .then((hiking) => {
                _onSuccessfulUpdatePlace(hiking, response)
                return hiking
            })
            .then((hiking) => {
                if (!hiking) {
                    _hikingNotFound(hiking, response)
                }
            })
            .catch((err) => _handleError(err, response))
        _onSuccessfulUpdatePlace = function (message, response) {
            response.status = process.env.HTTP_STATUS_NO_CONTENT
            response.message = message
            _sendResponse(res, response)
        }
        _hikingNotFound = function (message, response) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND
            response.message = "Hiking Id not found"
            _sendResponse(res, response)
        }
        _handleError = function (message, response) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND
            response.message = message
            _sendResponse(res, response)
        }
        _sendResponse = function (res, response) {
            res.status(response.status).json(response.message)
        }

        Hiking.findById(hiking_Id).select("places").exec(function (err, hiking) {
            console.log(hiking);
            const response = { status: process.env.HTTP_STATUS_NO_CONTENT, message: hiking };

            if (!hiking) {
                console.log("Hiking with this Id not found");
                response.status = process.env.HTTP_STATUS_NOT_FOUND;
                response.message = { message: "Hiking Id not found" }
            } if (response.status !== process.env.HTTP_STATUS_NO_CONTENT) {
                res.status(response.status).json(response.message);
            }
            replaceHikingCallback(req, res, place_Id, hiking);

        })
    } else {
        console.log("Please insert Valid hiking ID");
        res.status(response.status).json("please insert valid hiking ID")
    }
}


const _replaceOneCallback = function (req, res, place_Id, hiking) {
    console.log("replaceOneCallback controller");
    hiking.places.id(place_Id).name = req.body.name;
    hiking.places.id(place_Id).country = req.body.country;
    hiking.save
        .then((replacedHiking) => _onSuccefullReplacePlace(replacedHiking, response))
        .catch((err) => _handleError(err, response))
    _onSuccefullReplacePlace = function (message, response) {
        response.status = process.env.HTTP_STATUS_NO_CONTENT
        response.message = replacedHiking
        _sendResponse(res, response)
    }
    _handleError = function (message, response) {
        response.status = process.env.HTTP_STATUS_INTERNAL_ERROR
        response.message = message
        _sendResponse(res, response)
    }
    _sendResponse = function (res, response) {
        res.status(response.status).json(response.message)
    }
    hiking.save()
        .then((place) => {
            _onSuccessfullPartialUpdate(place, response)
        })
        .catch((err) => _handleError(err, response))

    _onSuccessfullPartialUpdate = function (message, response) {
        response.status = process.env.HTTP_STATUS_NO_CONTENT
        response.message = message
    }
    _handleError = function (err, response) {
        response.message = { message: "Error saving changes", err: err }
        response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR
    }

}


const _partialUpdateCallback = function (req, res, place_Id, hiking) {
    console.log("replaceOneCallback controller");
    hiking.places.id(place_Id).name = req.body.name || hiking.places.id(place_Id).name;
    hiking.places.id(place_Id).country = req.body.country || hiking.places.id(place_Id).country;
    hiking.save()
        .then()
        .catch((err) => _handleError(err, response))
    _onSuccefullUpdatePlace = function (message, response) {
        response.status = process.env.HTTP_STATUS_NO_CONTENT
        response.message = replacedHiking
        _sendResponse(res, response)
    }
    _handleError = function (message, response) {
        response.status = process.env.HTTP_STATUS_INTERNAL_ERROR
        response.message = message
        _sendResponse(res, response)
    }
    _sendResponse = function (res, response) {
        res.status(response.status).json(response.message)
    }
    hiking.save()
        .then((place) => {
            _onSuccessfullPartialUpdate(place, response)
        })
        .catch((err) => _handleError(err, response))

    _onSuccessfullPartialUpdate = function (message, response) {
        response.status = process.env.HTTP_STATUS_NO_CONTENT
        response.message = message
    }
    _handleError = function (err, response) {
        response.message = { message: "Error saving changes", err: err }
        response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR
    }

}

// Alternative Way
// const partialUpdatePlace = (req, res) => {
//     console.log("update place controller");
//     const { hiking_Id } = req.params;
//     const { place_Id } = req.params;
//     Hiking.updateOne({ _id: hiking_Id, "places._id": place_Id },
//         { $set: { "places.$.name": req.body.name, "places.$.country": req.body.country } }).exec((err, hiking) => {
//             console.log(hiking);
//             const response = { status: process.env.HTTP_STATUS_OK, message: "Place updated successfully!" }
//             if (err) {
//                 console.log(err);
//                 response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
//                 response.message = "Error updating place"
//             }

//             res.status(response.status).json(response.message);
//         })
// }



module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdatePlace,
    partialUpdatePlace

}