const db = require("../models");
const Presupuesto = db.presupuesto;
const Gasto = db.gastos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.rubro) {
        res.status(400).send({
            message: "Debe indicar rubro"
        });
        return
    }

    const presupuesto = {
        descripcion: req.body.descripcion,
        rubro: req.body.rubro,
        monto_mensual: req.body.monto_mensual ? req.body.monto_mensual : 0.00
    }

    Presupuesto.create(presupuesto)
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

// exports.findAll = () => {
//     return Presupuesto.findAll({
//       include: ["gastos"],
//     }).then((data) => {
//       return data;
//     });
//   };

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Presupuesto.findAll({ where: condition })
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

    Presupuesto.findByPk(id)
        .then(data=> {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al traer id: "+ id
            })
        })
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Presupuesto.destroy({
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
    Presupuesto.destroy({
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
