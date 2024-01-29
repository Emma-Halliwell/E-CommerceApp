const poolo = require('../pool');

// Storage - Routes for CRUD operations - Table storage
const getStorage = (req, res) => {
    pool.query(
    'SELECT * FROM storage JOIN price ON storage.price_id = price.id JOIN quantity ON storage.quantity_id = quantity.id',
    (error, results) => {
        if (error) {
            console.log('Error occured in retrieving storage');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getStorageById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
    'SELECT * FROM storage JOIN price ON storage.price_id = price.id JOIN quantity ON storage.quantity_id = quantity.id WHERE storage.id = $1',
    [id], (error, results) => {
        if (error) {
            console.log('Error occured in retrieving storage');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const createStorage = (req, res) => {
    const { id, name, description, price_id, quantity_id } = req.body;
    pool.query('INSERT INTO storage (id, name, description, price_id, quantity_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, name, description, price_id, quantity_id], (error, results) => {
        if (error) {
            console.log('Error occured when creating new storage');
        } else {
            res.status(200).send(`Storage added with ID: ${id}`);
        }
    });
};

const updateStorage = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price_id, quantity_id } = req.body;
    pool.query('UPDATE storage SET name = $2, description = $3, price_id = $4, quantity_id = $5 WHERE id = $1',
    [id, name, description, price_id, quantity_id], (error, results) => {
        if (error) {
            console.log('Error occured when updating storage');
        } else {
            res.status(200).send(`Storage modified with ID: ${id}`);
        }
    });
};

const deleteStorage = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM storage WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('Error occur when deleting from storage');
        } else {
            res.status(200).send(`Storage deleted with ID: ${id}`);
        }
    });
};

module.exports = {
    getStorage,
    getStorageById,
    createStorage,
    updateStorage,
    deleteStorage,
};