const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.get('/', (req, res) => {
  res.send('Hello World soy miembros!')
})

router.get('/all', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM noticias'); // Use the ID parameter in the query
      res.json(result.rows); // Send the results as JSON
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;