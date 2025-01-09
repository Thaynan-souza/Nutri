const { home } = require('../controllers/homecontroller');
const { dashboard, deleteMarmitas, editMarmitas, updateMarmita, incluirMarmita } = require('../controllers/dashboardcontroller');
const { login, authenticateUser, logout } = require('../controllers/logincontroller');
const { register, salvarUsuario } = require('../controllers/registercontroller');
const { ensureAuthenticated } = require('../middlewares/authMiddleware'); // Middleware para verificar login
const { carrinho, salvarPedido } = require('../controllers/carrinhocontroller'); // Importar salvarPedido

module.exports = {
    // Rota para a página inicial
    home: (app) => {
        app.get('/', function (req, res) {
            home(app, req, res);
        });
    },
    // Rota para a página de Cadastro
    register: (app) => {
        app.get('/register', function (req, res) {
            register(app, req, res);
        });
    },

    // Rota para salvar o usuário após o cadastro
    salvarUsuario: (app) => {
        app.post('/salvarUsuario', function (req, res) {
            salvarUsuario(app, req, res);
        });
    },

    // Rota para autenticar o usuário no login
    autenticar: (app) => {
        app.post('/login', function (req, res) {
            authenticateUser(req, res);
        });
    },

    // Rota para logout
    logout: (app) => {
        app.get('/logout', function (req, res) {
            logout(req, res);
        });
    },

    // Rota para a página do dashboard
    dashboard: (app) => {
        app.get('/dashboard', function (req, res) {
            dashboard(app, req, res);
        });

        // Rota POST para deletar uma marmita
        app.post('/dashboard/deletar/:id', function (req, res) {
            deleteMarmitas(app, req, res);
        });

        // Rota para editar uma marmita
        app.get('/dashboard/editar/:id', function (req, res) {
            editMarmitas(app, req, res);
        });

        // Rota POST para atualizar a marmita
        app.post('/dashboard/atualizar/:id', function (req, res) {
            updateMarmita(app, req, res);
        });

        // Rota POST para incluir uma nova marmita
        app.post('/dashboard/incluir', function (req, res) {
            incluirMarmita(req, res);
        });
    },


    // Rota GET para exibir a página de login
    login: (app) => {
        app.get('/login', function (req, res) {
            login(app, req, res);
        });
    },
    carrinho: (app) => {
        app.get('/carrinho', function (req, res) {
            carrinho(app, req, res); // Exibe os produtos disponíveis no carrinho
        });

        // Rota para salvar o pedido
        app.post('/carrinho/pedido', function (req, res) {
            salvarPedido(req, res); // Salva o pedido no banco de dados
        });
    },

};
