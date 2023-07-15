const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
// Open the connection to MySQL server
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

// Run create database statement
connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

connection.end();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    });
sequelize.authenticate()
    .then(() => {
        console.log(`conecado ao banco de dados ${process.env.DB_NAME}`);
        sequelize.sync({ alter: false });
    })
    .catch((e) => {
        console.log("erro ao conectar ao banco de dados");
    });

module.exports = sequelize;


