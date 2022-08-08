const jwt = require("jsonwebtoken");
const dbConfig = require("../config/db.config");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;

exports.login = (req, res) => {
  try {
    const email = {
      email: req.body.email,
    };
    User.findOne({ where: email })
      .then(data => {
        const passwordOK = bcrypt.compareSync(req.body.password, data.dataValues.password);
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
  let salt = bcrypt.genSaltSync(10);
  const user = {
    created: new Date(),
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  };

  User.create(user)
    .then((_) => {
      res.send("Usuario creado con éxito");
    })
    .catch((err) => {
      console.log("error creating user", err);
      res.status(500).send({
        message: "Ocurrió un error",
      });
    });
};
