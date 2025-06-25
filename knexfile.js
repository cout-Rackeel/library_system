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
            directory: './migrations'
        },
        seeds:{
            directory: './seeds'
        },
        useNullAsDefault: true,
    },

    production: {
        client: process.env.DB_CLIENT,
        connection:{
            connectionString:process.env.DB_CONNECTION_STRING,
            // host:process.env.DB_PROD_HOST,
            // port:process.env.DB_PORT,
            // user:process.env.DB_USER,
            // password:process.env.DB_PROD_PASSWORD?.trim(),
            // database:process.env.DB_PROD,
            pool: { min: 0, max: 5 },
            ssl: {rejectUnauthorized:false}
        },
        migrations:{
            directory: './server/migrations'
        },
        seeds:{
            directory: './server/seeds'
        },
        // useNullAsDefault: true
    }

};