const db = require("../models");
const Entry = db.entries;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.category) {
        res.status(400).send({
            message: "Debe indicar rubro"
        });
        return
    }

    const entry = {
        date: req.body.date,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        kind: req.body.kind,
    }

    Entry.create(entry)
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

    Entry.findAll({ where: condition })
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

exports.findOne = (req, res) => {
    const id = req.params.id;

    Entry.findByPk(id)
        .then(data=> {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al traer id: "+ id
            })
        })
};

exports.update = (req, res) => {

    const id = req.params.id;

    const entry = {
        date: req.body.date,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        kind: req.body.kind,
    }

    Entry.update(entry, {where: {id: id}})
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

exports.delete = (req, res) => {
    const id = req.params.id;

    Entry.destroy({
        where: { id: id }
    })
        .then(num=> {
            if (num ==1) {
                res.send({
                    message: "Borrado con éxito"
                });
            } else {
                res.send({
                    message: "No se pudo borrar id: " +id
                });
            }
            })
            .catch(err=> {
                res.status(500).send({
                    message: "No se logró borrar id: " +id
                });
            });
        };

exports.deleteAll = (req, res) => {
    Entry.destroy({
        where: {},
        truncate: false
    })
    .then(nums=> {
        res.send({ message: `Todos (${nums}) los items borrados`});
    })
    .catch(err=> {
        res.status(500).send({
            message:
                err.message || "Hubo un problema al querer borrar todo"
        });
    });
};
