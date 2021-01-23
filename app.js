const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
const requireLogin = require("./middleware/logmiddleware");


const app = express();


app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: "iloveMyKajal",
    resave: true,
    saveUninitialized: false
}));

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log("DB CONNECTED");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log("Listening on port ", PORT);
        });
    })
    .catch(err => {
        console.log("DB ERROR-->", err);
    });


//Routes
const login = require("./router/loginRoute");
const register = require("./router/registerRoute");
const logout = require("./router/logoutRoute");

app.use("/login", login);
app.use("/register", register);
app.use("/logout", logout);

