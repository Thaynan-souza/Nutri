const dbConnection = require('../../config/dbConnection');
const { getMarmitas, deleteMarmitasFromDb, getMarmitasById, updateMarmitasInDb, addMarmita } = require('../models/dashboardmodel');

// Exibir o dashboard com todas as marmitas
module.exports.dashboard = (app, req, res) => {
    const dbConn = dbConnection(); // Cria a conexão com o banco de dados
    getMarmitas(dbConn, (error, marmitas) => {
        if (error) {
            console.log('Erro ao buscar as marmitas:', error);
            res.render('error.ejs'); // Renderiza a página de erro
        } else {
            res.render('dashboard.ejs', { marmitas }); // Exibe o dashboard
        }
    });
};

// Deletar uma marmita
module.exports.deleteMarmitas = (app, req, res) => {
    const marmitaId = req.params.id; // Obtém o ID da marmita a ser deletada
    const dbConn = dbConnection();

    deleteMarmitasFromDb(dbConn, marmitaId, (error) => {
        if (error) {
            console.log('Erro ao deletar a marmita:', error);
            return res.redirect('/dashboard'); // Redireciona em caso de erro
        }

        console.log('Marmita deletada com sucesso!');
        res.redirect('/dashboard'); // Redireciona após a exclusão
    });
};

// Exibir o formulário de edição
module.exports.editMarmitas = (app, req, res) => {
    const marmitaId = req.params.id; // Obtém o ID da marmita
    const dbConn = dbConnection();

    getMarmitasById(dbConn, marmitaId, (error, marmita) => {
        if (error) {
            console.log('Erro ao buscar marmita para editar:', error);
            return res.redirect('/dashboard'); // Redireciona em caso de erro
        }

        getMarmitas(dbConn, (error, marmitas) => {
            if (error) {
                console.log('Erro ao buscar marmitas:', error);
                return res.render('error.ejs'); // Renderiza a página de erro
            }

            res.render('dashboard.ejs', { marmitas, editMarmita: marmita }); // Exibe o formulário de edição
        });
    });
};

// Atualizar uma marmita
module.exports.updateMarmita = (app, req, res) => {
    const marmitaId = req.params.id; // Obtém o ID da marmita
    const { sabor, descricao, preco, urlimagem } = req.body; // Pega os dados do formulário
    const dbConn = dbConnection();

    updateMarmitasInDb(dbConn, marmitaId, { sabor, descricao, preco, urlimagem }, (error) => {
        if (error) {
            console.log('Erro ao atualizar marmita:', error);
            return res.redirect(`/dashboard/editar/${marmitaId}`); // Redireciona em caso de erro
        }

        console.log('Marmita atualizada com sucesso!');
        res.redirect('/dashboard'); // Redireciona após a atualização
    });
};

// Incluir uma nova marmita
module.exports.incluirMarmita = (req, res) => {
    const dbConn = dbConnection();
    const { sabor, descricao, preco, urlimagem } = req.body;

    if (!sabor || !descricao || !preco || !urlimagem) {
        console.log('Todos os campos são obrigatórios.');
        return res.send('Todos os campos são obrigatórios. <a href="/dashboard">Voltar</a>');
    }

    const novaMarmita = { sabor, descricao, preco, urlimagem };
    addMarmita(dbConn, novaMarmita, (error) => {
        if (error) {
            console.error('Erro ao adicionar marmita:', error.message);
            return res.send('Erro ao adicionar marmita. Tente novamente mais tarde. <a href="/dashboard">Voltar</a>');
        }

        console.log('Marmita adicionada com sucesso!');
        res.redirect('/dashboard');
    });
};
