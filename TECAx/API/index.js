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
const rutaRecursos = require('./endpoints/recursos')
const rutaForm = require('./endpoints/form')
const rutaMiembros = require('./endpoints/miembros')
const rutaNoticias = require('./endpoints/noticias')
const rutaNormas = require('./endpoints/normas')
const rutaEmail = require('./endpoints/email');
const rutaModificarNoticias = require('./endpoints/modificarNoticias')
const rutaModificarRecursos = require('./endpoints/modificarRecursos')

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');


  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');


  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.setHeader('Content-Type', 'application/json; charset=utf-8');


  next();
});

//app.use(express.json()); // para que el servidor entienda json
app.use(express.json({ limit: '1mb', type: 'application/json' }));

app.use('/info', rutaInfo );
app.use('/rec', rutaRecursos );
app.use('/form', rutaForm);
app.use('/miem', rutaMiembros );
app.use('/not', rutaNoticias );
app.use('/normas', rutaNormas );
app.use('/modificar-noticias', rutaModificarNoticias);
app.use('/modificar-recursos', rutaModificarRecursos);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/email', rutaEmail);

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
      descripcion VARCHAR(300)
    );

    CREATE TABLE IF NOT EXISTS Recursos_Adicionales (
      ID SERIAL PRIMARY KEY,
      nombre VARCHAR(50),
      descripcion VARCHAR(300),
      URL VARCHAR(100),
      imagen VARCHAR(100),
      descripcionImagen VARCHAR (250)
    );

    CREATE TABLE IF NOT EXISTS Informacion (
      ID SERIAL PRIMARY KEY,
      tipo int,
      titulo VARCHAR(100),
      descripcion VARCHAR(700),
      nombreRecurso VARCHAR (30),
      linkRecurso VARCHAR (150),
      descripcionRecurso VARCHAR (250)
    );

    CREATE TABLE IF NOT EXISTS Noticias (
      ID SERIAL PRIMARY KEY,
      fecha VARCHAR(20),
      titulo VARCHAR(180),
      linkImagen VARCHAR (180),
      descripcionImagen VARCHAR(180),
      linkNoticia VARCHAR (180)
    );

    CREATE TABLE IF NOT EXISTS Preguntas (
      ID SERIAL PRIMARY KEY,
      pregunta VARCHAR(200),
      tipoRespuesta SMALLINT,
      opcionesRespuesta VARCHAR(200),
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

    CREATE TABLE IF NOT EXISTS Respuestas (
      ID SERIAL PRIMARY KEY,
      respuesta VARCHAR(1000),
      idPregunta SMALLINT,
      idFormularioRec INT,
      FOREIGN KEY (idPregunta) REFERENCES Preguntas(ID),
      FOREIGN KEY (idFormularioRec) REFERENCES FormulariosRecibidos(ID)
    );
  `;
  await pool.query(query);
  console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating tables', error)
}}


createTable()
