const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PGPORT,
});

const register = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        res.status(200).json(results.rows);
    });
};

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
// Fitness - Routes for CRUD operations - Table fitness_equipment
const getFitness = (req, res) => {
    pool.query(
    'SELECT * FROM fitness_equipment JOIN price ON fitness_equipment.price_id = price.id JOIN quantity ON fitness_equipment.quantity_id = quantity.id',
    (error, results) => {
        if (error) {
            console.log('Error occured in retrieving fitness equipment');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getFitnessById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
    'SELECT * FROM fitness_equipment JOIN price ON fitness_equipment.price_id = price.id JOIN quantity ON fitness_equipment.quantity_id = quantity.id WHERE fitness_equipment.id = $1',
    [id], (error, results) => {
        if (error) {
            console.log('Error occured in retrieving fitness equipment');
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const createFitness = (req, res) => {
    const { id, name, description, price_id, quantity_id } = req.body;
    pool.query('INSERT INTO fitness_equipment (id, name, description, price_id, quantity_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, name, description, price_id, quantity_id], (error, results) => {
        if (error) {
            console.log('Error occured when creating new fitness equipment');
        } else {
            res.status(200).send(`Fitness equipment added with ID: ${id}`);
        }
    });
};

const updateFitness = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price_id, quantity_id } = req.body;
    pool.query('UPDATE fitness_equipment SET name = $2, description = $3, price_id = $4, quantity_id = $5 WHERE id = $1',
    [id, name, description, price_id, quantity_id], (error, results) => {
        if (error) {
            console.log('Error occured when updating fitness equipment');
        } else {
            res.status(200).send(`Fitness equipment modified with ID: ${id}`);
        }
    });
};

const deleteFitness = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM fitness_equipment WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('Error occur when deleting from fitness equipment');
        } else {
            res.status(200).send(`Fitness equipment deleted with ID: ${id}`);
        }
    });
};

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
    register,
    getPrice,
    getPriceById,
    createPrice,
    updatePrice,
    deletePrice,
    getQuantity,
    getQuantityById,
    createQuantity,
    updateQuantity,
    deleteQuantity,
    getPlay,
    getPlayById,
    createPlay,
    updatePlay,
    deletePlay,
    getFitness,
    getFitnessById,
    createFitness,
    updateFitness,
    deleteFitness,
    getStorage,
    getStorageById,
    createStorage,
    updateStorage,
    deleteStorage,
    getFootball,
    getFootballById,
    createFootball,
    updateFootball,
    deleteFootball,
};