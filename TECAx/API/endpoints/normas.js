const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.get('/', (req, res) => {
  res.send('Hello World soy normas!')
})

router.get('/all', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM informacion WHERE tipo = $1', [5]); // Filtra por tipo = 5
      res.json(result.rows); // Envía los resultados como JSON
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
