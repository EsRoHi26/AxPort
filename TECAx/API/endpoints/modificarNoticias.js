const express = require('express');
const router = express.Router();
const pool = require('../db.js'); 

// Método para eliminar una noticia por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM noticias WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }
        res.status(200).json({ message: 'Noticia eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la noticia' });
    }
});
// Método para actualizar una noticia por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { descripcionimagen, fecha, linkimagen, linknoticia, titulo } = req.body;

    console.log('Datos recibidos:', req.body); // Agrega esta línea para depuración

    try {
        const result = await pool.query(
            `UPDATE noticias
             SET descripcionimagen = $1, fecha = $2, linkimagen = $3, linknoticia = $4, titulo = $5
             WHERE id = $6`,
            [descripcionimagen, fecha, linkimagen, linknoticia, titulo, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }
        res.status(200).json({ message: 'Noticia actualizada' });
    } catch (error) {
        console.error('Error al actualizar la noticia:', error);
        res.status(500).json({ message: 'Error al actualizar la noticia' });
    }
});

// Método para agregar una noticia
router.post('/', async (req, res) => {
    const { fecha, titulo, linkimagen, descripcionimagen, linknoticia } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO noticias (id, fecha, titulo, linkimagen, descripcionimagen, linknoticia)
            VALUES (nextval('noticias_id_seq'::regclass), $1, $2, $3, $4, $5)`,
            [fecha, titulo, linkimagen, descripcionimagen, linknoticia]
        );

        res.status(201).json({ message: 'Noticia agregada exitosamente', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar la noticia' });
    }
});

module.exports = router;
