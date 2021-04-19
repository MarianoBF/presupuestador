const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const docs = YAML.load("./documentation.yaml");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(docs));

const checker = require("./app/config/db.config");

const db = require("./app/models");

mysql
  .createConnection({
    user: checker.USER,
    password: checker.PASSWORD,
    host: checker.HOST,
  })
  .then(connection => {
    connection
      .query("CREATE DATABASE IF NOT EXISTS " + checker.DB + ";")
      .then(() => {
        db.sequelize.sync();

        app.get("/", (req, res) => {
          res.json({message: "Servicio operativo"});
        });

        require("./app/routes/entry.routes")(app);
        require("./app/routes/budget.routes")(app);

        const PORT = process.env.PORT;

        app.listen(PORT, () => {
          console.log("Servidor activo");
        });
      })
      .catch(error=>console.log(error));
  })
  .catch(error=>console.log(error));
