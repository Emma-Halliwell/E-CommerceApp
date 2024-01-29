const pool = require('../pool');

// Football - Routes for CRUD operations - Table football_equipment
const getFootball = (req, res) => {
    pool.query(
    'SELECT * FROM football_equipment JOIN price ON football_equipment.price_id = price.id JOIN quantity ON football_equipment.quantity_id = quantity.id',
    (error, results) => {
        if (error) {
            console.log('Error occured in retrieving football equipment');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getFootballById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
    'SELECT * FROM football_equipment JOIN price ON football_equipment.price_id = price.id JOIN quantity ON football_equipment.quantity_id = quantity.id WHERE football_equipment.id = $1',
    [id], (error, results) => {
        if (error) {
            console.log('Error occured in retrieving football equipment');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const createFootball = (req, res) => {
    const { id, name, description, price_id, quantity_id } = req.body;
    pool.query('INSERT INTO football_equipment (id, name, description, price_id, quantity_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, name, description, price_id, quantity_id], (error, results) => {
        if (error) {
            console.log('Error occured when creating new football equipment');
        } else {
            res.status(200).send(`Football equipment added with ID: ${id}`);
        }
    });
};

const updateFootball = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price_id, quantity_id } = req.body;
    pool.query('UPDATE football_equipment SET name = $2, description = $3, price_id = $4, quantity_id = $5 WHERE id = $1',
    [id, name, description, price_id, quantity_id], (error, results) => {
        if (error) {
            console.log('Error occured when updating football equipment');
        } else {
            res.status(200).send(`Football equipment modified with ID: ${id}`);
        }
    });
};

const deleteFootball = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM football_equipment WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('Error occur when deleting from football equipment');
        } else {
            res.status(200).send(`Football equipment deleted with ID: ${id}`);
        }
    });
};

module.exports = {
    getFootball,
    getFootballById,
    createFootball,
    updateFootball,
    deleteFootball,
};