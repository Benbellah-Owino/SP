//Import server utilities
const express = require("express")
const server = express()

//Dotenv
require("dotenv").config();
//module for uploading images
const fileUpload = require('express-fileupload');
const imageUp = require("./image").image

//module for connecting database


//importing cors
const cors = require("cors");
const session = require("express-session")
var MySQLStore = require('express-mysql-session')(session);
const cookieParser = require("cookie-parser")

//importing router
const custRoutes = require("./router/customer");
const invRoutes = require("./router/inventory");
const transRoutes = require("./router/transactions");
const userRoutes = require("./router/users")

const connection = require("./dbConnect/connect")

//middleware
server.use(cookieParser())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(cors({ credentials: true, origin: true }))
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
server.use(fileUpload())
server.use(express.static('public'));






//Routes
server.use("/da/api/customer", custRoutes);
server.use("/da/api/inventory", invRoutes);
server.use("/da/api/transactions", transRoutes);
server.use("/da/api/users", userRoutes);

server.get("/", (req, res) => {
    connection.query("SELECT * FROM user", function (err, result, fields) {
        res.send(result)
    });
})

server.get("/getcookies", (req, res) => {
    res.json(req.cookies)
})

server.post('/upload', (req, res) => {
    const { image } = req.body;
    console.log(image)

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    let path = __dirname + '/upload/' + image.name
    image.mv(path);

    res.sendStatus(200);
});
server.get("/pic", (req, res) => {
    res.send(`<div style="background-image: url(${imageUp}); height:500px; width:800px;"></div>`)
})




//Starting up the API
const start = () => {


    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected to DB!");
    });

    console.log("Connecting to server...")
    server.listen(3000, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(`Server is listening on port 3000...`)
    })
}

start();