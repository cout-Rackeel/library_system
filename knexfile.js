require("dotenv").config();

module.exports = {
    development: {
        client:process.env.DB_CLIENT,
        connection:{
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB,
        },
        migrations:{
            directory: './server/migrations'
        },
        seeds:{
            directory: './server/seeds'
        },
    },

    production: {
        client: process.env.DB_CLIENT,
        connection:process.env.DB_CONNECTION_STRING,
        pool: { min: 0, max: 10 },
        migrations:{
            directory: './server/migrations'
        },
        seeds:{
            directory: './server/seeds'
        },
    }

};