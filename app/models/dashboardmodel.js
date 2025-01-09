const dbConnection = require('../../config/dbConnection');

// Função para buscar todas as Marmitas
module.exports.getMarmitas = (dbConnection, callback) => {
    const sql = 'SELECT * FROM marmitas;';
    dbConnection.query(sql, callback);  // Retorna todas as Marmitas
};

// Função para deletar uma Marmita do banco de dados
module.exports.deleteMarmitasFromDb = (dbConnection, marmitasId, callback) => {
    const sql = 'DELETE FROM marmitas WHERE id = ?';
    dbConnection.query(sql, [marmitasId], callback);  // Deleta a Marmitas com o ID fornecido
};

// Função para buscar uma Marmita pelo ID
module.exports.getMarmitasById = (dbConnection, marmitasId, callback) => {
    const sql = 'SELECT * FROM marmitas WHERE id = ?';
    dbConnection.query(sql, [marmitasId], callback);  // Retorna a Marmitas com o ID fornecido
};

// Função para atualizar os dados de uma Marmitas no banco de dados
module.exports.updateMarmitasInDb = (dbConnection, marmitasId, data, callback) => {
    const { sabor, descricao, preco, urlimagem } = data;
    const sql = 'UPDATE marmitas SET sabor = ?, descricao = ?, preco = ?, urlimagem = ? WHERE id = ?';
    dbConnection.query(sql, [sabor, descricao, preco, urlimagem, marmitasId], callback);  // Atualiza a marmita com o ID fornecido
};

// Função para inserir uma nova Marmita no banco de dados
module.exports.addMarmita = (dbConnection, data, callback) => {
    const { sabor, descricao, preco, urlimagem } = data;
    const sql = 'INSERT INTO marmitas (sabor, descricao, preco, urlimagem) VALUES (?, ?, ?, ?)';
    dbConnection.query(sql, [sabor, descricao, preco, urlimagem], callback);  // Insere uma nova Marmita no banco
};
