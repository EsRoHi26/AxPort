const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.post('/fr', async (req, res) => {
  const getDate = new Date();
  try {
    const result = await pool.query(
      'INSERT INTO FormulariosRecibidos (idUsuario, email, sede, fecha, resouestas) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.body.idUsuario, req.body.email, req.body.sede, getDate, req.body.resouestas]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/fp', async (req, res) => {
  try {
    const result = await pool.query(
      'INSERT INTO respuestas (respuesta, idpregunta, idformulariorec) VALUES ($1, $2, $3) RETURNING *',
      [req.body.respuesta, req.body.idPregunta, req.body.idFormulario]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
