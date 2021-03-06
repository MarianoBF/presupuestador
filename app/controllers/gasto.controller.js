const db = require("../models");
const Gasto = db.gastos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.rubro) {
        res.status(400).send({
            message: "Debe indicar rubro"
        });
        return
    }

    const gasto = {
        rubro: req.body.rubro,
        descripcion: req.body.descripcion,
        pagado: req.body.pagado ? req.body.pagado : false
    }

    Gasto.create(gasto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error"
            })
        })
};

exports.findAll = (req, res) => {

};

exports.findOne = (req, res) => {

};

exports.delete = (req, res) => {
    
};

exports.deleteAll = (req, res) => {

};

exports.findAllPublished = (req, res) => {

};