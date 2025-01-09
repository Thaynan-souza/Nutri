// Importando dotenv para carregar as variáveis de ambiente
const dotenv = require('dotenv');
dotenv.config();

let express = require('express'); // O express retorna uma função
let app = express(); // express é uma função.
let port = 3000;

const RedisStore =require('connect-redis').RedisStore;
const { createClient } = require('./DbRedis');
const client = createClient();

let expressSession = require('express-session');

// Configuração da view engine EJS
app.set('view engine', 'ejs');
app.set('views', './app/views'); // Define onde as views estão armazenadas

// Middleware para servir arquivos estáticos (CSS)
app.use(express.static('public'));

// Middleware para processar dados de formulários
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão com variável de ambiente
app.use(expressSession({
  store: new RedisStore({ client }),
  secret: process.env.SECRET, // Usando a variável de ambiente SECRET
  resave: false,
  saveUninitialized: false
}));

app.listen(port, function () {
  console.log('Servidor rodando com express na porta', port);
});

module.exports = app;
