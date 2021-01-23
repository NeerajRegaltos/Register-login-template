const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
    res.render("register", { title: "Register" });
});

router.post("/", async (req, res) => {
    const email = req.body.email.trim();
    const password = req.body.password;
    const confPassword = req.body.confPassword;

    if (email && password && confPassword) {
        if (password !== confPassword) {
            var errorMessage = "Passwords Do not match";
            return res.status(200).render("register", { email, errorMessage, title: "Register" });
        }

        const user = await User.findOne({ email })
            .catch(error => {
                console.log(error);
                var errorMessage = "Something went Wrong";
                res.status(200).render("register", { email, errorMessage, title: "Register" });
            });

        if (user === null) {
            var data = req.body;

            data.password = await bcrypt.hash(password, 10);

            User.create(data)
                .then(user => {
                    req.session.user = user;
                    return res.redirect("/login");
                });
        }
        else {
            if (email === user.email) {
                var errorMessage = "Email already in use";
            }
            res.status(200).render("register", { errorMessage, title: "Register" });
        }

    }
    else {
        var errorMessage = "Make sure each field is filled";
        res.status(200).render("register", { email, errorMessage, title: "Register" });
    }

});

module.exports = router;