require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const dataRoutes = require("./routes/dataRoutes")

const port = process.env.PORT
const dbURI = process.env.DB_URI

app.use(cors())
app.use(express.json())

mongoose.connect(dbURI)
    .then(() => {
        app.listen(port)
        console.log("Connected to database on port " + port)

        app.use(authRoutes)
        app.use(dataRoutes)
    })
    .catch((err) => {
        console.log(err)
    })

