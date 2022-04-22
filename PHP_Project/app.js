const express = require("express");
require("dotenv").config();
require("./api/data/db");
const app = express();
const path = require("path");
const routes = require("./api/routes");
const authenticate = require("./api/controllers/authentication.controller")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});
app.use("/api", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-with, Content-Type, Authorization')
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT, PATCH, OPTIONS")
    next();
});



app.use("/api", routes)
// app.use("/api", routes);


const server = app.listen(process.env.PORT, function(){
    console.log(process.env.PORT_MESSAGE, server.address().port);
})