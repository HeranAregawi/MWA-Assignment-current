require("dotenv").config();
const express = require("express");
const path = require("path");
require("./api/data/db");
//const cors = require('cors');


const routes = require("./api/routes");
const app = express();
// app.use(cors());
// app.use("/api", function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', "http://localhost:4200");
//     // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept')
//     // res.header("Access-Control-Allow-Methods", "DELETE")
//         next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use("/api", routes);

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));


const server = app.listen(process.env.PORT, function () {
    console.log("Listening to PORT ", server.address().port);
})