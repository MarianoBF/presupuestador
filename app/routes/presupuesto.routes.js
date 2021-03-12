module.exports = app => {
    const presupuesto = require("../controllers/presupuesto.controller.js");

    let router = require("express").Router();

    router.post("/presupuesto", presupuesto.create);

    router.get("/", presupuesto.findAll);

    router.get("/:id", presupuesto.findOne);

    router.delete("/:id", presupuesto.delete);

    router.delete("/", presupuesto.deleteAll);

    app.use("/api/presupuesto", router);

};