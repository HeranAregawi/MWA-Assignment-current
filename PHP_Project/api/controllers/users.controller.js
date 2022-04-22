const mongoose = require('mongoose');
const Users = mongoose.model(process.env.USERS_MODEL);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const response = {
    status: process.env.HTTP_STATUS_CREATED,
    message: {}
}
const addOne = function (req, res) {
    console.log("Add One user controller");

    // const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS)
    if (req.body && req.body.username && req.body.password) {

        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (err, salt) => _checkForErrorCreateHashThenCreateUser(err, salt, response, req, res))

    }
    else {
        response.status = process.env.HTTP_STATUS_BAD_REQUEST
        response.message = "Incorrect user parameters"
        _sendResponse(res, response)
    }

    _checkForErrorCreateHashThenCreateUser = function (err, salt, response, req, res) {
        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR
            response.message = "Error hashing password"
            _sendResponse(res, response)
        } else {
            bcrypt.hash(req.body.password, salt, (err, passwordHash) => _checkForErrorAndCreateUser(err, passwordHash, response, req, res))
        }
    }
    _sendResponse = function (res, response) {
        res.status(response.status).json(response.message)
    }
    _checkForErrorAndCreateUser = function (err, passwordHash, response, req, res) {
        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR
            response.message = "Error creating User"
            _sendResponse(res, response)

        } else {
            const newUser = {
                name: req.body.name,
                username: req.body.username,
                password: passwordHash
                // bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(process.env.SALT_ROUNDS))
            };
            Users.create(newUser)
                .then((createdUser) => {
                    response.status = process.env.HTTP_STATUS_CREATED
                    response.message = createdUser
                    _onSuccessfulUserCreation(res, response)
                })
                .catch((err) => {
                    response.status = process.env.HTTP_STATUS_INTERNAL_ERROR
                    response.message = { message: "Error creating user" }
                    _handleError(res, response)
                })
            // .finally(() => _sendResponse(res, response))
        }
        _onSuccessfulUserCreation = function (res, response) {
            res.status(response.status).json(response.message)

        }
        _handleError = function (res, response) {
            res.status(response.status).json(response.message)
        }
        _sendResponse = function (res, response) {
            res.status(response.status).json(response.message)
        }




    }
}

const login = function (req, res) {
    console.log("login Controller called");
    if (req.body && req.body.username && req.body.password) {

        Users.findOne({ username: req.body.username }).exec()

            .then((user) => this._checkAccountPassword(user, req, response))
            .catch((err) => _handleError(err, response))
            .finally(() => _sendResponse(res, response))
    } else {
        response.status = process.env.HTTP_STATUS_BAD_REQUEST
        response.message = process.env.INCORECT_ADD_USER_PARAMETERS;
        _sendResponse(res, response)
    }
}
_checkAccountPassword = function (user, req, response) {
    if (!user) {
        console.log("Username not in database");
        response.status = process.env.HTTP_STATUS_UNAUTHORIZED;
        response.message = "Unauthorized"
    }
    else {

        if (bcrypt.compareSync(req.body.password, user.password)) {
            console.log(user.name);
            console.log("Login Done");
            response.status = process.env.HTTP_STATUS_OK
            const token = jwt.sign({ name: user.name }, process.env.JWT_PASSWORD, { expiresIn: '1h' });
            response.message = { success: true, token: token }
            console.log(user.name);
            // _sendResponse(res, response)
        } else {
            console.log("Password Incorrect");
            response.status = process.env.HTTP_STATUS_UNAUTHORIZED
            response.message = "Unauthorized"
            // _sendResponse(res, response)
        }
    }
}
_handleError = function (err, response) {
    response.status = process.env.HTTP_STATUS_INTERNAL_ERROR
    response.message = "Error login user"
    // _sendResponse(res, response)
}
_sendResponse = function (res, response) {
    res.status(response.status).json(response.message)
}




module.exports = {
    addOne,
    login,
    
}