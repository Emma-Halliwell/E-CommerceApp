const pool = require('../pool');

// Play = Routes for CRUD Operations = Table play_equipment
const getPlay = (req, res) => {
    pool.query(
    'SELECT * FROM play_equipment JOIN price ON play_equipment.price_id = price.id JOIN quantity ON play_equipment.quantity_id = quantity.id',
    (error, results) => {
        if (error) {
            console.log('Error occured in retrieving play equipment');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getPlayById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
    'SELECT * FROM play_equipment JOIN price ON play_equipment.price_id = price.id JOIN quantity ON play_equipment.quantity_id = quantity.id WHERE play_equipment.id = $1',
    [id], (error, results) => {
        if (error) {
            console.log('Error occured in retrieving play equipment');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const createPlay = (req, res) => {
    const { id, name, description, price_id, quantity_id } = req.body;
    pool.query('INSERT INTO play_equipment (id, name, description, price_id, quantity_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, name, description, price_id, quantity_id], (error, results) => {
        if (error) {
            console.log('Error occured when creating new play equipment');
        } else {
            res.status(200).send(`Play equipment added with ID: ${id}`);
        }
    });
};

const updatePlay = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price_id, quantity_id } = req.body;
    pool.query('UPDATE play_equipment SET name = $2, description = $3, price_id = $4, quantity_id = $5 WHERE id = $1',
    [id, name, description, price_id, quantity_id], (error, results) => {
        if (error) {
            console.log('Error occured when updating play equipment');
        } else {
            res.status(200).send(`Play equipment modified with ID: ${id}`);
        }
    });
};

const deletePlay = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM play_equipment WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('Error occur when deleting from play equipment');
        } else {
            res.status(200).send(`Play equipment deleted with ID: ${id}`);
        }
    });
};

module.exports = {
    getPlay,
    getPlayById,
    createPlay,
    updatePlay,
    deletePlay,
};