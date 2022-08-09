const jwt = require("jsonwebtoken");
const dbConfig = require("../config/db.config");

chequearToken = (token) => {
  let validacion;
  if (!token) {
    validacion = "No se incluyó un token!";
    }

  jwt.verify(token, dbConfig.SECRET, (err, decoded) => {
    if (err) {
        validacion =  "Token inválido";
    } else {
        decoded.resultado = "Autorizado";
        validacion = decoded;
    }
  });
  return validacion
};

module.exports = chequearToken;