//const User = require("../models/user_model.js");
const jwt = require("jsonwebtoken");
const dbConfig = require("../config/db.config");
const bcrypt = require("bcryptjs");
const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.user;

exports.login = (req, res) => {
  try {
    const email = {
      email: req.body.email,
    };
    let condition = email ? { email: { [Op.like]: `%${req.body.email}%` } } : null;

    User.findOne({ where: condition })
      .then(data => {
        //const passwordOK = bcrypt.compareSync(req.body.password, res.password);
        const passwordOK = data.dataValues.password === req.body.password;
        if (passwordOK) {
          const token = jwt.sign(
            {
              id_usuario: data.dataValues.id,
              email: data.dataValues.email,
            },
            dbConfig.SECRET,
            { expiresIn: 86400 }
         );
          res.status(200).send(token);
        } else {
          res.status(400).send("Usuario y/o Password Incorrecto");
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error al procesar");
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en servidor");
  }
};

exports.register = (req, res) => {
  const user = {
    created: new Date(),
    email: req.body.email,
    password: String(req.body.password),
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("error creating user", err);
      res.status(500).send({
        message: "Ocurrió un error",
      });
    });
};
