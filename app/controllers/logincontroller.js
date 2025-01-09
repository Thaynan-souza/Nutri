const dbConnection = require('../../config/dbConnection'); // Importa a conexão com o banco de dados
const { findUserByEmail, authenticateUser } = require('../models/loginmodel'); // Importa as funções do model
const bcrypt = require('bcryptjs'); // Importa o bcryptjs para criptografar a senha

module.exports = {
    // Exibe a página de login
    login: (app, req, res) => {
        console.log('[Controller Login]');
        res.render('login.ejs', { error: null }); // Renderiza a página de login
    },

    // Processa o login do usuário
    authenticateUser: (req, res) => {
        console.log('[Controller authenticateUser]');
        const { email, password } = req.body;

        // Valida se os campos foram preenchidos
        if (!email || !password) {
            return res.render('login.ejs', { error: 'E-mail e senha são obrigatórios!' });
        }

        const dbConn = dbConnection(); // Cria a conexão com o banco de dados

        // Busca o usuário no banco pelo e-mail
        findUserByEmail(email, (error, user) => {
            if (error) {
                console.error('[Error]', error);
                return res.render('login.ejs', { error: 'Erro ao buscar o usuário. Tente novamente mais tarde.' });
            }

            if (!user) {
                return res.render('login.ejs', { error: 'E-mail não cadastrado.' });
            }

            // Verifica se a senha informada é igual à cadastrada (com a senha criptografada)
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('[Error]', err);
                    return res.render('login.ejs', { error: 'Erro ao verificar a senha. Tente novamente.' });
                }

                if (!isMatch) {
                    return res.render('login.ejs', { error: 'Senha incorreta.' });
                }

                // Salva o usuário na sessão após autenticação bem-sucedida
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    nome: user.nome
                };

                console.log('[Session]', req.session.user);

                // Redireciona para o dashboard após login bem-sucedido
                return res.redirect('/dashboard');
            });
        });
    },

    // Função para logout do usuário
    logout: (req, res) => {
        console.log('[Controller Logout]');
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao encerrar a sessão:', err);
                return res.send('Erro ao encerrar a sessão. Tente novamente.');
            }

            console.log('Sessão encerrada com sucesso.');
            res.redirect('/login'); // Redireciona para a página de login
        });
    }
};
