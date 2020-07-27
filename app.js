const express = require("express");
const drinkRoutes = require("./routes/drinks")
const sellerRoutes = require("./routes/sellers")
const cors = require("cors")
const bodyParser = require("body-parser")
const { Drink } = require("./db/models")
const db = require("./db")
const path = require('path');

const app = express()


app.use(cors())
app.use(bodyParser.json())

//Routers

app.use("/drinks", drinkRoutes)
app.use("/sellers", sellerRoutes)
app.use("/media", express.static(path.join(__dirname, "media")));

//Not Found Paths
app.use((req, res, next) => {
    res.status(404).json("Path not found");
});

// const error = new Error("path not Found")
// error.status = 404;
// next(error)

//Handling Errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message || "Internal Server Error",
    });
});


const run = async () => {
    try {

        await db.sync();
        console.log("Connection to the database successful!");


    } catch (error) {
        console.error("Error connecting to the database: ", error);
    }

    await app.listen(8000, () => {
        console.log("The application is running on localhost:8000");
    });

};



run();










