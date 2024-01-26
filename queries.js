const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PGPORT,
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log('Error has occured');
        } else {
            response.status(200).json(results.rows);
        }
    });
};

// Fitness - Routes for CRUD operations - Table fitness_equipment
const getFitness = (request, response) => {
    pool.query('SELECT * FROM fitness_equipment ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log('Error has occured');
        } else {
            console.log(results.rows);
            response.status(200).json(results.rows);
        }
    });
};

module.exports = {
    getUsers,
    getFitness,
};