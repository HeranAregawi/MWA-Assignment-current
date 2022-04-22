const jwt = require("jsonwebtoken");
const util=require("util")
const jwtVerifyPromise = util.promisify(jwt.verify, {context:jwt})
const response = {
    status: process.env.HTTP_STATUS_FORBIDDEN,
    message: { message: "No token provided" }
}
const authenticate = function (req, res, next) {
    const headerExistes = req.headers.authorization;
    if (headerExistes) {
        
        const token = req.headers.authorization;
        jwtVerifyPromise(token, process.env.JWT_PASSWORD)
            .then(() => next())
            .catch((err) => this._invalidAutherzationToken(err, res, response))
            // .finally(() => this._sendResponse(res, response))
    } else {
        this._sendResponse(res, response)
    }
}
_invalidAutherzationToken = function (error, res, response) {
    console.log(error);
    response.status = process.env.HTTP_STATUS_UNAUTHORIZED
    response.message = "Unauthorized";
    this._sendResponse(res, response)

}
_sendResponse = function (res, response) {
    res.status(response.status).json(response.message)
}
module.exports = {
    authenticate
}
