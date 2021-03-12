const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql2/promise');


const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
            res.json({message: "Bienvenido"});

        });


        require("./app/routes/gastos.routes")(app);
        require("./app/routes/presupuesto.routes")(app);


        const PORT = 8500;

        app.listen(PORT, () => {
            console.log("Servidor activo");
        });

    })
})





