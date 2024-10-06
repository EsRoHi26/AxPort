const express = require('express');
const router = express.Router();
const pool = require('../db.js');

router.get('/', (req, res) => {
  res.send('Hello World soy info!')
})

router.get('/:ID', async (req, res) => {
  const { ID } = req.params; // Extract the ID parameter from the request
  try {
      const result = await pool.query('SELECT * FROM informacion WHERE ID = $1', [ID]); // Use the ID parameter in the query
      res.json(result.rows); // Send the results as JSON
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
