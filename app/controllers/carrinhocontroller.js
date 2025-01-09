const dbConnection = require('../../config/dbConnection');

module.exports.carrinho = (app, req, res) => {
    const dbConn = dbConnection();
    const sql = 'SELECT id, sabor, preco FROM marmitas;';

    dbConn.query(sql, (error, marmitas) => {
        if (error) {
            console.error('Erro ao buscar produtos:', error.message);
            return res.send('Erro ao carregar produtos. Tente novamente.');
        }
        res.render('carrinho.ejs', { marmitas }); // Renderiza a página do carrinho
    });
};

module.exports.salvarPedido = (req, res) => {
    const dbConn = dbConnection();
    const { produtoId, quantidade } = req.body;
    const usuarioId = req.session.user ? req.session.user.id : null;

    if (!usuarioId) {
        return res.send('É necessário estar logado para fazer um pedido. <a href="/login">Faça login</a>');
    }

    const sql = 'INSERT INTO pedidos (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)';
    dbConn.query(sql, [usuarioId, produtoId, quantidade], (error) => {
        if (error) {
            console.error('Erro ao salvar pedido:', error.message);
            return res.send('Erro ao salvar pedido. Tente novamente.');
        }
        console.log('Pedido salvo com sucesso!');
        return res.send('Pedido salvo com sucesso! <a href="/">Home</a>');
    });
};
