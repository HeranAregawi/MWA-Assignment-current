const mongoose = require("mongoose");
const Hiking = mongoose.model(process.env.HIKING_MODEL);
const response = {
    status: process.env.HTTP_STATUS_OK,
    message: {}
}

const getAll = function (req, res) {

    let offset = 0;
    let count = 0;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(process.env.HTTP_STATUS_BAD_REQUEST).json({ message: "QueryString offset and count shold be numbers" });
        return;
    }
    if (count > process.env.MAX_COUNT || offset > process.env.MAX_COUNT) {
        res.status(process.env.HTTP_STATUS_BAD_REQUEST).json({ message: "Count and offsee cannot exceed " + process.env.MAX_COUNT });
        return;
    }

    Hiking.find().skip(offset).limit(count)
        .exec()
        .then((hiking) => {
            this._onSuccessfullGetHiking(hiking, response)
        })
        .catch((err => this._handleFindingHikingError(err, response)))
        .finally(() => this._sendResponse(res, response))

    _onSuccessfullGetHiking = function (message, response) {
        response.status = process.env.HTTP_STATUS_OK;
        response.message = message

    }


}
_sendResponse = function (res, response) {
    res.status(response.status).json(response.message)
}
_hikingNotFound = function (response) {
    response.status = process.env.HTTP_STATUS_NOT_FOUND
    response.message = "Hiking not found"
}
_handleFindingHikingError = function (err, response) {
    response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    response.message = { message: "Error finding Hiking", err: err }

}
isValid = function (id) {
    return mongoose.isValidObjectId(id);
}


const getOne = function (req, res) {
    const hiking_Id = req.params.hiking_Id;
    Hiking.findById(hiking_Id)

        .exec()
        .then((hiking) => {
            this._onSuccessfullGetHiking(hiking, response)
            return hiking
        })
        .then((hiking) => {
            if (!hiking) {
                this._hikingNotFound(response)
            }
        })
        .catch((err) => this._handleFindingHikingError(err, response))
        .finally(() => this._sendResponse(res, response))

    _onSuccessfullGetHiking = function (message, response) {
        response.status = process.env.HTTP_STATUS_OK;
        response.message = message

    }


}

const addOne = function (req, res) {
    if (req.body && req.body.typeOfPlace && req.body.places && req.body.rating && req.body.feedback) {
        const newHiking = {
            typeOfPlace: req.body.typeOfPlace,
            places: req.body.places,
            rating: parseInt(req.body.rating),
            feedback: req.body.feedback

        };
        Hiking.create(newHiking)
            .then((createdUser) => this._onSuccessfulHikingCreation(createdUser, response))
            .catch((err) => this._handleError(err, response))
            .finally(() => this._sendResponse(res, response))
    } else {
        response.status = process.env.HTTP_STATUS_BAD_REQUEST
        response.message = "Plase enter all required fields"
        _sendResponse(res, response)
    }
    _onSuccessfulHikingCreation = function (createdUser, response) {
        response.status = process.env.HTTP_STATUS_CREATED
        response.message = createdUser
    }
    _handleError = function (err, response) {
        response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR
        response.message = { message: "Error creating Hiking", err: err }
    }

}

const deleteOne = function (req, res) {
    console.log(req.params.hiking_Id);
    const { hiking_Id } = req.params;
    Hiking.findByIdAndDelete(hiking_Id)
        .exec()
        .then((deletedHiking) => {
            this._onsuccessfulDeleteHiking(deletedHiking, response)
            return deletedHiking
        })

        .then((deletedHiking) => {
            if (!deletedHiking) {
                this._hikingNotFound(response)
            }
        })
        .catch((err) => this._handleError(err, response))
        .finally(() => this._sendResponse(res, response))

    _onsuccessfulDeleteHiking = function (message, response) {
        response.status = process.env.HTTP_STATUS_NO_CONTENT;
        response.message = process.env.DEFAULT_MESSAGE

    }
    _handleError = function (message, response) {
        response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR
        response.message = { message: "Error deleting Hiking", err: message }
    }
}
const fullUpdateOne = function (req, res) {
    console.log("fullUpdate hiking controller");
    _updateOne(req, res, _replaceOneCallback);


}
const partialUpdate = function (req, res) {
    console.log("partialUpdate hiking controller");
    _updateOne(req, res, _partialUpdateCallback)
}
const _updateOne = function (req, res, replaceHikingCallback) {
    console.log(" _updateOne controller");
    const { hiking_Id } = req.params;

    if (isValid(hiking_Id)) {
        Hiking.findById(hiking_Id)
            .exec()
            .then((hiking) => {
                if (!hiking) {
                    this._hikingNotFound(response)
                }
                return hiking
            })
            // .then((hiking) => {

            //     if (response.status != process.env.HTTP_STATUS_NO_CONTENT) {
            //         this._sendResponse(res, response)
            //     }
            //     return hiking

            // })
            .then((hiking) => {
                replaceHikingCallback(req, res, hiking)
            })
            .catch((err) => this._handleError(err, response))
            .finally(() => this._sendResponse(res, response))

        _handleError = function (err, response) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR
            response.message = { message: "Error replacing Hiking", err: err }
        }


    } else {
        console.log("Please insert Valid hiking ID");
        res.status(response.status).json("please insert valid hiking ID")
    }
}


const _replaceOneCallback = function (req, res, hiking) {
    console.log("replace one controller");

    hiking.typeOfPlace = req.body.typeOfPlace;
    hiking.places = req.body.places;
    hiking.rating = parseInt(req.body.rating);
    hiking.feedback = req.body.feedback;
    console.log(hiking);
    hiking.save()
        .then((replacedHiking) => {
            _onSuccessfullReplaceHiking(replacedHiking, response)
        })
        .catch((err) => this._handleError(err, response))


    _onSuccessfullReplaceHiking = function (message, response) {
        response.status = process.env.HTTP_STATUS_NO_CONTENT
        response.message = process.env.DEFAULT_MESSAGE
    }
    _handleError = function (err, response) {
        response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR
        response.message = { message: "Error saving new Hiking", err: err }
    }



}
const _partialUpdateCallback = function (req, res, hiking) {
    hiking.typeOfPlace = req.body.typeOfPlace || hiking.typeOfPlace;
    hiking.places = req.body.places || hiking.places;
    hiking.rating = parseInt(req.body.rating || hiking.rating);
    hiking.feedback = req.body.feedback || hiking.feedback;
    hiking.save()
        .then((replacedHiking) => {
            console.log(replacedHiking);
            _onSuccessfullPartialUpdate(replacedHiking, response)
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

};

const getHikingByTypeOfPlace = function (req, res,) {

    const typeOfPlace = req.query.typeOfPlace;
    //const typeOfPlaces = [process.env.TYPE_OF_PLACES
    // flag = false;
    // typeOfPlace = ""
    //for (let i = 0; i < typeOfPlaces.length; i++) {
    if (typeOfPlace == "City" || "Mountain" || "Park" || "city" || "mountain" || "park") {
        // flag = true
        // typeOfPlace= typeOfPlace[i]
        Hiking.find({ typeOfPlace: typeOfPlace })
            .exec()
            .then((hiking) => {
                _onSuccessfullGetHikingByTypeOfPlace(hiking, response)
            })
            .catch((err => _handleError(err, response)))

        _onSuccessfullGetHikingByTypeOfPlace = function (message, response) {
            response.status = process.env.HTTP_STATUS_OK
            response.message = message
            this._sendResponse(res, response)
        }
        _handleError = function (err, response) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR
            response.message = { message: "Error searching Hikings", err: err }
            this._sendResponse(res, response)
        }

    } else {
        response.status = process.env.HTTP_STATUS_BAD_REQUEST;
        response.message = "Please enter valid Type of Place"
        res.status(response.status).json(response.message);
    }

}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdateOne,
    partialUpdate,
    getHikingByTypeOfPlace


}