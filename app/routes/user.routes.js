module.exports = app => {
    const auth = require("../controllers/user.controller.js");

    let router = require("express").Router();

    router.post("/login", usuarios.login);

    app.use("/api/budget", router);

};