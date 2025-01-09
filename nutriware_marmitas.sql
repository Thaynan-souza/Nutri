create database `nutriware`;
use `nutriware`;

DROP TABLE IF EXISTS `marmitas`;

CREATE TABLE `marmitas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sabor` varchar(45) NOT NULL,
  `descricao` varchar(1000) NOT NULL,
  `preco` int NOT NULL,
  `urlimagem` varchar(450) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

INSERT INTO `marmitas`(sabor, descricao, preco, urlimagem)
VALUES 
(
'Frango com batatas',
'Uma refeição balanceada e deliciosa, composta por pedaços suculentos de frango grelhado acompanhados de batatas assadas, temperadas com ervas finas. Ideal para quem busca um prato nutritivo e saboroso, perfeito para o almoço do dia a dia.',
25,
'https://github.com/Thaynan-souza/Nutriware/blob/main/Frango-batatas.jpeg?raw=true'
),
(
'Arroz com legumes e carne seca',
'Uma combinação de arroz soltinho, legumes frescos e carne seca desfiada, tudo preparado com um toque especial de temperos que realçam o sabor caseiro. Uma opção reconfortante e cheia de nutrientes, que traz o melhor da culinária brasileira',
27,
'https://github.com/Thaynan-souza/Nutriware/blob/main/carne-seca.jpeg?raw=true'
),

('Lasanha de berinjela com macarrão ao molho',
'Uma opção leve e saborosa para quem busca um prato vegetariano. Fatias de berinjela substituem a massa tradicional, criando uma lasanha recheada com molho de tomate caseiro, que se combina perfeitamente com o macarrão ao molho. Uma refeição rica em sabor e com um toque de frescor.',
26,
'https://github.com/Thaynan-souza/Nutriware/blob/main/lasanha.jpeg?raw=true'
);

use `nutriware`;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100), 
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

USE nutriware;

CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL, 
    produto_id INT NOT NULL, 
    quantidade INT NOT NULL, 
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (usuario_id) REFERENCES users(id),
    FOREIGN KEY (produto_id) REFERENCES marmitas(id)
)