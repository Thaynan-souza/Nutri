// Carregar as variáveis de ambiente
const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql2');

const port = process.env.port;

// Usar as variáveis de ambiente para as configurações do banco de dados
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

module.exports = () => {
    return dbConn = mysql.createPool({
        host: host,
        database: database,
        user: user,
        password: password,
        port: port
    });
};
