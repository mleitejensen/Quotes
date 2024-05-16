require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")

const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoutes")
const dataRoutes = require("./routes/dataRoutes")

const port = process.env.PORT
const dbURI = process.env.DB_URI

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
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

