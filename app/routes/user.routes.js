module.exports = app => {
    const user = require("../controllers/user.controller.js");

    let router = require("express").Router();

    router.post("/login", user.login);

    app.use("/api/budget", router);

};