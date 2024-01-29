const pool = require('../pool');

// Quantity - Routes for CRUD operations - Table quantity
const getQuantity = (req, res) => {
    pool.query('SELECT * FROM quantity ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log('Error occured when retrieving quantity table');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getQuantityById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM quantity WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('Error occured when retrieving data using id');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const createQuantity = (req, res) => {
    const { id, quantity_list } = req.body;
    pool.query('INSERT INTO quantity (id, quantity_list) VALUES ($1, $2) RETURNING *', 
    [id, quantity_list], (error, results) => {
        if (error) {
            console.log('Error occured when creating new quantity');
        } else {
            res.status(200).send(`Quantity added with ID: ${id}`);
        }
    });
};

const updateQuantity = (req, res) => {
    const id = parseInt(req.params.id);
    const { quantity_list } = req.body;
    pool.query('UPDATE quantity SET quantity_list = $2 WHERE id = $1', [id, quantity_list], (error, results) => {
        if (error) {
            console.log('Error occured when updating data with given id');
        } else {
            res.status(200).send(`Price modified with ID: ${id}`);
        }
    });
};

const deleteQuantity = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM quantity WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('Error occured when deleting from quantity');
        } else {
            res.status(200).send(`Quantity deleted with ID: ${id}`);
        }
    });
};

module.exports = {
    getQuantity,
    getQuantityById,
    createQuantity,
    updateQuantity,
    deleteQuantity,
};