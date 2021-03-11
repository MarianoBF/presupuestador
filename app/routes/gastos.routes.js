module.exports = app => {
    const gastos = require("../controllers/gasto.controller.js");

    let router = require("express").Router();

    router.post("/gastos", gastos.create);

    router.get("/", gastos.findAll);

    router.get("/pagados", gastos.findAllPagados);

    router.get("/:id", gastos.findOne);

    router.delete("/:id", gastos.delete);

    router.delete("/", gastos.deleteAll);

    app.use("/api/gastos", router);

};