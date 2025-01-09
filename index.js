const app = require('./config/server'); // Importa o servidor
const routes = require('./app/routes/routes'); // Importa as rotas

// Configura as rotas principais do sistema
routes.home(app);
routes.dashboard(app);
routes.login(app);
routes.register(app);
routes.salvarUsuario(app);

routes.carrinho(app); // Rota para exibir o carrinho


// Adiciona as rotas de autenticação
routes.autenticar(app); // Rota para autenticar o usuário
routes.logout(app); // Rota para logout

console.log('Rotas configuradas com sucesso.');
