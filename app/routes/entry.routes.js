module.exports = app => {
    const entry = require("../controllers/entry.controller.js");

    let router = require("express").Router();

    router.post("/entry", entry.create);

    router.get("/", entry.findAll);

    router.get("/:id", entry.findOne);

    router.delete("/:id", entry.delete);

    router.delete("/", entry.deleteAll);

    app.use("/api/entry", router);

};