const db = require("../models");
const Budget = db.budget;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.category) {
        res.status(400).send({
            message: "Falta rubro"
        });
        return
    }
    if (!req.body.description) {
        res.status(400).send({
            message: "Falta descripción"
        });
        return
    }
    if (!req.body.limit) {
        res.status(400).send({
            message: "Falta monto"
        });
        return
    }

    const budget = {
        category: req.body.category,
        description: req.body.description,
        limit: req.body.limit
    }

    Budget.create(budget)
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
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Budget.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error al buscar."
            })
        })
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Budget.destroy({
        where: { id: id }
    })
        .then(data=> {
            console.log(data)
            if (+data === 1) {
                res.status(204).send({
                    message: "Borrado con éxito"
                });
            } else {
                res.status(400).send({
                    message: "No se pudo borrar id: " +id
                });
            }
            })
            .catch(()=> {
                res.status(500).send({
                    message: "No se logró borrar id: " +id
                });
            });
        };

exports.deleteAll = (req, res) => {
    Budget.destroy({
        where: {},
        truncate: false
    })
    .then(nums=> {
        res.status(202).send({ message: `Todos (${nums}) los items borrados`});
    })
    .catch(err=> {
        res.status(500).send({
            message:
                err.message || "Hubo un problema al querer borrar todo"
        });
    });
};
