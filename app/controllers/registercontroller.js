const dbConnection = require('../../config/dbConnection');
const { inserirUsuario } = require('../models/registermodel');
const bcrypt = require('bcryptjs'); // Importa o bcryptjs para criptografar a senha

module.exports = {
    register: (app, req, res) => {
        console.log('[Controller cadastrarUsuario]');
        res.render('register.ejs'); // Renderiza a página com o formulário
    },
    
    salvarUsuario: (app, req, res) => {
        console.log('[Controller salvarUsuario]');

        const { nome, email, password } = req.body;

        // Validações
        if (!nome || nome.trim() === '') {
            return res.send('O campo Nome não pode ser vazio. <a href="/register">Voltar</a>');
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.send('Informe um email válido. <a href="/register">Voltar</a>');
        }

        if (!password || password.length < 6 || password.length > 20) {
            return res.send('A senha deve ter entre 6 e 20 caracteres. <a href="/register">Voltar</a>');
        }

        // Criptografando a senha antes de salvar no banco
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('[Error]', err);
                return res.send('Erro ao criptografar a senha. Tente novamente. <a href="/register">Voltar</a>');
            }

            // Conexão com o banco e inserção
            const dbConn = dbConnection();
            inserirUsuario(dbConn, { nome, email, password: hashedPassword }, (error) => {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        return res.send('O email já está cadastrado. <a href="/register">Voltar</a>');
                    }
                    console.error('Erro ao salvar Usuario:', error.message);
                    return res.send('Erro ao salvar Usuario. Tente novamente mais tarde. <a href="/register">Voltar</a>');
                }

                console.log('Usuario cadastrado com sucesso!');
                res.send('Usuario cadastrado com sucesso! <a href="/login">logar</a>');
            });
        });
    },
};
