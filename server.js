const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and resynchronize db.");
//   });

app.get("/", (req, res) => {
    res.json({message: "Bienvenido"});
});

app.listen(8500, () => {
    console.log("Servidor activo");
});




// let usuario = {
//  nombre:'Juan',
//  apellido: 'Perez'
// };

// let respuesta = {
//  error: false,
//  codigo: 200,
//  mensaje: ''
// };



// app.get('/', function(req, res) {
//  respuesta = {
//   error: true,
//   codigo: 200,
//   mensaje: 'Punto de inicio'
//  };
//  res.send(respuesta);
// });

// app.get('/usuario', cors(), function (req, res, next) {
//  respuesta = {
//   error: false,
//   codigo: 200,
//   mensaje: ''
//  };

//  if(usuario.nombre === '' || usuario.apellido === '') {
//   respuesta = {
//    error: true,
//    codigo: 501,
//    mensaje: 'El usuario no ha sido creado'
//   };
//  } else {
//   respuesta = {
//    error: false,
//    codigo: 200,
//    mensaje: 'respuesta del usuario',
//    respuesta: usuario
//   };
//  }
//  res.send(respuesta);
// });
// app.post('/usuario', function (req, res) {

//  if(!req.body.nombre || !req.body.apellido) {
//   respuesta = {
//    error: true,
//    codigo: 502,
//    mensaje: 'El campo nombre y apellido son requeridos'
//   };
//  } else {

//   if(usuario.nombre !== '' || usuario.apellido !== '') {
//    respuesta = {
//     error: true,
//     codigo: 503,
//     mensaje: 'El usuario ya fue creado previamente'
//    };
//   } else {
//    usuario = {
//     nombre: req.body.nombre,
//     apellido: req.body.apellido
//    };
//    respuesta = {
//     error: false,
//     codigo: 200,
//     mensaje: 'Usuario creado',
//     respuesta: usuario
//    };
//   }
//  }
 
//  res.send(respuesta);
// });

