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

router.get('/solicitud', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT fr.id, fr.email, fr.idusuario, fr.sede, fr.fecha, r.respuesta, p.pregunta FROM formulariosrecibidos AS fr INNER JOIN respuestas AS r ON fr.id = r.idformulariorec INNER JOIN preguntas AS p ON r.idpregunta = p.id WHERE fr.resouestas = 'Solicitud'");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/denuncia', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT fr.id, fr.email, fr.idusuario, fr.sede, fr.fecha, fr.tipousuario, r.respuesta, p.pregunta FROM formulariosrecibidos AS fr INNER JOIN respuestas AS r ON fr.id = r.idformulariorec INNER JOIN preguntas AS p ON r.idpregunta = p.id WHERE fr.resouestas = 'denuncia'");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM respuestas WHERE idformulariorec = $1', [id]);
    const result2 = await pool.query('DELETE FROM formulariosrecibidos WHERE id = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
