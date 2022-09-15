const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Crear el servidor/App de express

// console.log( process.env );

const app = express();

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public'));


// CORS

app.use( cors() );

// Lectura y parseo del body

app.use( express.json() );


// GET
// app.get('/', (req, res, next) => {

//     res.json({
//         ok: true,
//         msg: 'Todo salio bien',
//         uid: 1234
//     });

// });

// Rutas 
app.use( '/api/auth', require( './routes/auth' ) );

// Manejar todas las demás rutas
app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
} )


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});


