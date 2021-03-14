module.exports = app => {
    const entry = require("../controllers/entry.controller.js");

    let router = require("express").Router();

    router.post("/entry", entry.create);

    router.get("/entries", entry.findAll);

    router.put("/entry/:id", entry.update);

    router.delete("/entry/:id", entry.delete);

    router.delete("/entry", entry.deleteAll);

    app.use("/api", router);

};