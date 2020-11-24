const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const mongoose = require('./database');
const cors = require ('cors');


//Creamos el servidor
const app = express();

//Puerto de la app
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit : '10mb'}));// for parsing application/json
app.use(express.urlencoded({ limit: '10mb', extended : true })); // for parsing application/x-www-form-urlencoded

//Rutas
app.use('/api', require('./routes'));

//Iniciar la APP
app.listen(PORT, () => {
    console.log(`La app esta funcionando en el puerto ${PORT}`);
})

