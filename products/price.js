const pool = require('../pool');

// Price - Routes for CRUD operations - Table price
const getPrice = (req, res) => {
    pool.query('SELECT * FROM price', (error, results) => {
        if (error) {
            console.log('Error has occured');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getPriceById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM price WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('Error has occured');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const createPrice = (req, res) =>{
    const { id, price_list} = req.body;
    pool.query('INSERT INTO price (id, price_list) VALUES ($1, $2) RETURNING *', 
    [id, price_list], (error, results) => {
        if (error) {
            console.log('Error occured when posting new price');
        } else {
            res.status(200).send(`Price added with ID: ${results.rows[0].id}`);
        }
    });
};

const updatePrice = (req, res) => {
    const id = parseInt(req.params.id);
    const { price_list }  = req.body;
    pool.query('UPDATE price SET price_list = $2 WHERE id = $1', [id, price_list], (error, results) => {
        if (error) {
            console.log('Error occured in updating price');
        } else {
            res.status(200).send(`Price modified with ID: ${id}`);
        }
    });
};

const deletePrice = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM price WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('error occured when deleting price');
        } else {
            res.status(200).send(`Price deleted with ID: ${id}`);
        }
    });
};

module.exports = {
    getPrice,
    getPriceById,
    createPrice,
    updatePrice,
    deletePrice,
};