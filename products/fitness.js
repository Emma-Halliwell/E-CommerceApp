const pool = require('../pool');

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

module.exports = {
    getFitness,
    getFitnessById,
    createFitness,
    updateFitness,
    deleteFitness,
};