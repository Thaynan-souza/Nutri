const dbConnection = require('../../config/dbConnection'); // Importa a conexão com o banco de dados

module.exports = {
    // Função para retornar todos os dados de login (não utilizada diretamente no login)
    getLogin: (dbConnection, callback) => {
        console.log('[Model] Consultando todos os registros de login');
        callback();
    },

    // Função para encontrar o usuário pelo e-mail
    findUserByEmail: (email, callback) => {
        const db = dbConnection(); // Cria a conexão com o banco de dados
        const query = 'SELECT * FROM users WHERE email = ?'; // Consulta no banco para buscar o usuário por email

        db.query(query, [email], (error, results) => {
            if (error) {
                return callback(error, null); // Retorna erro se houver
            }

            // Retorna o usuário encontrado, incluindo os dados das colunas (como 'password' e outros)
            callback(null, results[0]); // 'results[0]' traz o primeiro (e único) usuário encontrado
        });
    },

    // Função para autenticar o usuário (e-mail e senha)
    authenticateUser: (user, connection, callback) => {
        const query = 'SELECT * FROM users WHERE email = ? AND password = ?'; // Verifica e-mail e senha
        connection.query(query, [user.email, user.password], (error, results) => {
            if (error) {
                return callback(error, null); // Retorna erro se houver
            }

            // Retorna o usuário encontrado ou vazio se não houver correspondência
            callback(null, results);
        });
    }
};
