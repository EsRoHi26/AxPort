const express = require('express')
//const { Pool } = require('pg')
const pool = require('./db.js')
const app = express()
const port = 8080
const cors = require('cors');
app.use(cors());

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('Connected to the database')
  release()
})

const rutaInfo = require('./endpoints/info')

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');


  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');


  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(express.json()); // para que el servidor entienda json

app.use('/info', rutaInfo ); // ruta para los usuarios

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//Codigo para crear la base de datos
//=============================================

async function createTable() {
  console.log('Creating tables...');
  try {
  const query = `

    CREATE TABLE IF NOT EXISTS Formularios (
      ID SERIAL PRIMARY KEY,
      nombre VARCHAR(50),
      descripcion VARCHAR(100)
    );

    CREATE TABLE IF NOT EXISTS Recursos_Adicionales (
      ID SERIAL PRIMARY KEY,
      nombre VARCHAR(50),
      descripcion VARCHAR(100),
      URL VARCHAR(100),
      imagen VARCHAR(100),
      idFormulario SMALLINT,
      FOREIGN KEY (idFormulario) REFERENCES Formularios(ID)
    );

    CREATE TABLE IF NOT EXISTS Informacion (
      ID SERIAL PRIMARY KEY,
      tipo VARCHAR(25),
      titulo VARCHAR(25),
      descripcion VARCHAR(100),
      idRecurso SMALLINT,
      FOREIGN KEY (idRecurso) REFERENCES Recursos_Adicionales(ID)
    );

    CREATE TABLE IF NOT EXISTS Preguntas (
      ID SERIAL PRIMARY KEY,
      pregunta VARCHAR(100),
      tipoRespuesta SMALLINT,
      opcionesRespuesta VARCHAR(100),
      idFormulario SMALLINT,
      FOREIGN KEY (idFormulario) REFERENCES Formularios(ID)
    );

    CREATE TABLE IF NOT EXISTS Miembros (
      ID SERIAL PRIMARY KEY,
      nombre VARCHAR(50),
      email VARCHAR(50),
      telefono VARCHAR(15),
      sede VARCHAR(15)
    );

    CREATE TABLE IF NOT EXISTS FormulariosRecibidos (
      ID SERIAL PRIMARY KEY,
      tipoUsuario VARCHAR(25),
      idUsuario INTEGER,
      resouestas VARCHAR(500),
      email VARCHAR(50),
      sede VARCHAR(15),
      fecha DATE,
      idFormulario SMALLINT,
      idEncargado SMALLINT,
      FOREIGN KEY (idFormulario) REFERENCES Formularios(ID),
      FOREIGN KEY (idEncargado) REFERENCES Miembros(ID)
    );
  `;
  await pool.query(query);
  console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating tables', error)
}}


//createTable()
