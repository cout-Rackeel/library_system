
require("dotenv").config();
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);
const { log } = require('console');

/*
    Interpretation of Line 2
    const knex = require('knex')({
        client:process.env.DB_CLIENT --> pg ,
        connection:{
            host:process.env.DB_HOST --> localhost,
            port:process.env.DB_PORT --> 5432,
            user:process.env.DB_USER --> postgres,
            passwprd:process.env.DB_PASSWORD --> postgres123,
            database:process.env.DB --> library_system,
        }
    });

*/

log(config)

const connectToDatabase = async () => {
    await knex.raw('SELECT 1')
    .then(result => {
        log(`DB Connection is Active...`);
    })
    .catch(error => {
        log(`Error While Connecting Database\n${error}\nRetry Database Connection after 5000ms\n`);
        setTimeout(() => {
            connectToDatabase();
        }, 5000) // Retry connection every 5 seconds
    })
};

connectToDatabase();

module.exports = knex;