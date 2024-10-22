const express = require('express');
const router = express.Router();
const pool = require('../db.js'); 

// Método para agregar un recurso
router.post('/', async (req, res) => {
    const { nombre, descripcion, url, imagen, descripcionimagen, tipo } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO recursos_adicionales (id, nombre, descripcion, url, imagen, descripcionimagen, tipo)
            VALUES (nextval('recursos_adicionales_id_seq'::regclass), $1, $2, $3, $4, $5, $6)`,
            [nombre, descripcion, url, imagen, descripcionimagen, tipo]
        );

        res.status(201).json({ message: 'Recurso agregado exitosamente', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el recurso' });
    }
});

// Método para eliminar un recurso por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM recursos_adicionales WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        res.status(200).json({ message: 'Recurso eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el recurso' });
    }
});

// Método para actualizar un recurso por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, url, imagen, descripcionimagen, tipo } = req.body;

    try {
        const result = await pool.query(
            `UPDATE recursos_adicionales
            SET nombre = $1, descripcion = $2, url = $3, imagen = $4, descripcionimagen = $5, tipo = $6
            WHERE id = $7`,
            [nombre, descripcion, url, imagen, descripcionimagen, tipo, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        res.status(200).json({ message: 'Recurso actualizado' });
    } catch (error) {
        console.error('Error al actualizar el recurso:', error);
        res.status(500).json({ message: 'Error al actualizar el recurso' });
    }
});

module.exports = router;
