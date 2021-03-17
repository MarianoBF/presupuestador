const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql2/promise');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs')
const docs = YAML.load('./app/documentation/documentation.yaml');



const app = express();

const corsOptions = {
    origin: "http://localhost"
};

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(docs));


const checker = require("./app/config/db.config");

const db = require("./app/models");

mysql.createConnection({
    user     : checker.USER,
    password : checker.PASSWORD,
    host     : checker.HOST,
}).then((connection) => {
    connection.query('CREATE DATABASE IF NOT EXISTS ' + checker.DB +';').then(() => {
        db.sequelize.sync();

        app.get("/", (req, res) => {
            res.json({message: "Servicio operativo"});

        });


        require("./app/routes/entry.routes")(app);
        require("./app/routes/budget.routes")(app);


        const PORT = process.env.PORT || 8500;

        app.listen(PORT, () => {
            console.log("Servidor activo");
        });

    })
})





