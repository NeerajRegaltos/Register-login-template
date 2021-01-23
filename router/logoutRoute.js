const express = require("express");
const router = express.Router();
const session = require("express-session");

router.get("/", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;