module.exports = {
    // Buscar produtos disponíveis
    getProdutos: (connection, callback) => {
        const sql = 'SELECT * FROM marmitas;';
        connection.query(sql, callback);
    },

    // Salvar pedido no banco
    salvarPedido: (connection, { userId, produto_id, quantidade }, callback) => {
        const sql = 'INSERT INTO pedidos (user_id, produto_id, quantidade) VALUES (?, ?, ?);';
        connection.query(sql, [userId, produto_id, quantidade], callback);
    }
};
