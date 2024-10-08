const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.post('/fr', async (req, res) => {
  const getDate = new Date();
  try{
    await pool.query('INSERT INTO FormulariosRecibidos (idUsuario, email, sede, fecha) VALUES ($1, $2, $3, $4)', [req.body.idUsuario, req.body.email, req.body.sede, getDate]);
    res.status(201).json({ success: 'Formulario creado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
