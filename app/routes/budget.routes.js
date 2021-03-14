module.exports = app => {
    const budget = require("../controllers/budget.controller.js");

    let router = require("express").Router();

    router.post("/", budget.create);

    router.get("/", budget.findAll);

    router.get("/:id", budget.findOne);

    router.delete("/:id", budget.delete);

    router.delete("/", budget.deleteAll);

    app.use("/api/budget", router);

};