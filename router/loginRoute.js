const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");


router.get("/", (req, res) => {
    res.render("login", { title: "Login" });
});

router.post("/", async (req, res) => {

    const email = req.body.email.trim();
    const password = req.body.password;

    if (email && password) {

        const user = await User.findOne({ email })
            .catch(error => {
                console.log(error);

                var errorMessage = "Something Went Wrong.";
                res.render("login", { errorMessage, email, title: "Login" });
            });

        if (user !== null) {
            var result = await bcrypt.compare(password, user.password);
            if (result === true) {
                //correct password
                req.session.user = user;
                return res.redirect(`/`);
            }
        }
        var errorMessage = "Credentials incorrect.";
        return res.render("login", { errorMessage, title: "Login" });
    }
    var errorMessage = "Make sure each field has correct values.";
    return res.render("login", { errorMessage, title: "Login" });

});



module.exports = router;