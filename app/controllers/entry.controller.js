const db = require("../models");
const Entry = db.entries;
const Op = db.Sequelize.Op;
const checkDate = require("../helpers/checkDate");

exports.create = (req, res) => {
  try {
    if (
      chequearToken(req.headers["x-access-token"]).resultado === "Autorizado"
    ) {
      if (!req.body.category) {
        res.status(400).send({
          message: "Debe indicar rubro",
        });
        return;
      }

      const entry = {
        date: req.body.date,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        kind: req.body.kind,
      };

      const dateOK = checkDate(entry.date);

      if (!dateOK) {
        res.status(400).send({
          message:
            "Hubo un problema con la fecha indicada, revisala. Recordá que debe estar entre el 2000 y 2050",
        });
      } else {
        Entry.create(entry)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Ocurrió un error",
            });
          });
      }
    } else {
      res.status(401).send({ message: "Token inválido" });
    }
  } catch {
    res
      .status(400)
      .send({ message: "Hubo un problema, revise los datos y reintente" });
  }
};

exports.findAll = (req, res) => {
  try {
    if (
      chequearToken(req.headers["x-access-token"]).resultado === "Autorizado"
    ) {
      const title = req.query.title;
      let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

      Entry.findAll({ where: condition })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error al buscar.",
          });
        });
    } else {
      res.status(401).send({ message: "Token inválido" });
    }
  } catch {
    res
      .status(400)
      .send({ message: "Hubo un problema, revise los datos y reintente" });
  }
};

exports.update = (req, res) => {
  try {
    if (
      chequearToken(req.headers["x-access-token"]).resultado === "Autorizado"
    ) {
      const id = req.params.id;

      const entry = {
        date: req.body.date,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        kind: req.body.kind,
      };

      Entry.update(entry, { where: { id: id } })
        .then((data) => {
          if (+data === 1) {
            res.status(202).send({
              message: "Actualizado con éxito",
            });
          } else {
            res.status(400).send({
              message: "No se puedo actualizar id: " + id,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Ocurrió un error",
          });
        });
    } else {
      res.status(401).send({ message: "Token inválido" });
    }
  } catch {
    res
      .status(400)
      .send({ message: "Hubo un problema, revise los datos y reintente" });
  }
};

exports.delete = (req, res) => {
  try {
    if (
      chequearToken(req.headers["x-access-token"]).resultado === "Autorizado"
    ) {
      const id = req.params.id;

      Entry.destroy({
        where: { id: id },
      })
        .then((data) => {
          if (+data === 1) {
            res.send({
              message: "Borrado con éxito",
            });
          } else {
            res.status(400).send({
              message: "No se pudo borrar id: " + id,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "No se logró borrar id: " + id,
          });
        });
    } else {
      res.status(401).send({ message: "Token inválido" });
    }
  } catch {
    res
      .status(400)
      .send({ message: "Hubo un problema, revise los datos y reintente" });
  }
};

exports.deleteAll = (req, res) => {
  try {
    if (
      chequearToken(req.headers["x-access-token"]).resultado === "Autorizado"
    ) {
      Entry.destroy({
        where: {},
        truncate: false,
      })
        .then((nums) => {
          res
            .status(202)
            .send({ message: `Todos (${nums}) los items borrados` });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Hubo un problema al querer borrar todo",
          });
        });
    } else {
      res.status(401).send({ message: "Token inválido" });
    }
  } catch {
    res
      .status(400)
      .send({ message: "Hubo un problema, revise los datos y reintente" });
  }
};
