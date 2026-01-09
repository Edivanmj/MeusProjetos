CREATE DATABASE PetShop;
USE PetShop;

-- Usuários
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    endereco VARCHAR(200),
    telefone VARCHAR(20),
    email VARCHAR(100)
);

-- Produtos
CREATE TABLE Produto (
    idProduto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL
);

-- Serviços
CREATE TABLE Servico (
    idServico INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    duracao VARCHAR(50)
);

-- Compras
CREATE TABLE Compra (
    idCompra INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    dataCompra DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),

    CONSTRAINT fk_compra_usuario
        FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Itens da compra
CREATE TABLE ItemCompra (
    idItem INT AUTO_INCREMENT PRIMARY KEY,
    idCompra INT NOT NULL,
    idProduto INT NOT NULL,
    quantidade INT NOT NULL,
    precoUnitario DECIMAL(10,2),

    CONSTRAINT fk_itemcompra_compra
        FOREIGN KEY (idCompra) REFERENCES Compra(idCompra)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_itemcompra_produto
        FOREIGN KEY (idProduto) REFERENCES Produto(idProduto)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Pagamentos
CREATE TABLE Pagamento (
    idPagamento INT AUTO_INCREMENT PRIMARY KEY,
    idCompra INT NOT NULL,
    metodo VARCHAR(50),
    valor DECIMAL(10,2),

    CONSTRAINT fk_pagamento_compra
        FOREIGN KEY (idCompra) REFERENCES Compra(idCompra)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Agendamentos
CREATE TABLE Agendamento (
    idAgendamento INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idServico INT NOT NULL,
    dataAgendamento DATETIME,

    CONSTRAINT fk_agendamento_usuario
        FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_agendamento_servico
        FOREIGN KEY (idServico) REFERENCES Servico(idServico)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Inserts

INSERT INTO Usuario (nome, cpf, endereco, telefone, email)
VALUES 
('João Silva', '123.456.789-00', 'Rua A, 123', '11999999999', 'joao@email.com'),
('Maria Souza', '987.654.321-00', 'Rua B, 456', '11888888888', 'maria@email.com');

-- Inserindo produtos
INSERT INTO Produto (nome, descricao, preco, estoque)
VALUES
('Ração Premium', 'Ração para cães adultos', 99.90, 50),
('Brinquedo Bola', 'Bola de borracha para cães', 19.90, 100);

-- Inserindo serviços
INSERT INTO Servico (nome, descricao, preco, duracao)
VALUES
('Banho', 'Banho completo com produtos hipoalergênicos', 49.90, '30 minutos'),
('Tosa', 'Tosa higiênica completa', 59.90, '45 minutos');

-- Inserindo compras
INSERT INTO Compra (idUsuario, status)
VALUES
(1, 'Pendente'),
(2, 'Pago');

-- Inserindo itens de compra
INSERT INTO ItemCompra (idCompra, idProduto, quantidade, precoUnitario)
VALUES
(1, 1, 2, 99.90),
(2, 2, 3, 19.90);

-- Inserindo pagamentos
INSERT INTO Pagamento (idCompra, metodo, valor)
VALUES
(2, 'Cartão de Crédito', 59.70);

-- Inserindo agendamentos
INSERT INTO Agendamento (idUsuario, idServico, dataAgendamento)
VALUES
(1, 1, '2025-10-15 10:00:00'),
(2, 2, '2025-10-16 14:30:00');

-- Selects

-- 1. Listar todos os usuários
SELECT * FROM Usuario;

-- 2. Listar produtos com estoque disponível
SELECT * FROM Produto WHERE estoque > 0;

-- 3. Consultar itens de uma compra específica
SELECT 
    c.idCompra, p.nome AS produto, ic.quantidade, ic.precoUnitario
FROM 
    Compra c
JOIN ItemCompra ic ON c.idCompra = ic.idCompra
JOIN Produto p ON ic.idProduto = p.idProduto
WHERE c.idCompra = 1;

-- 4. Consultar pagamentos de uma compra
SELECT * FROM Pagamento WHERE idCompra = 2;

-- 5. Ver agendamentos de um usuário
SELECT 
    a.idAgendamento, s.nome AS servico, a.dataAgendamento
FROM 
    Agendamento a
JOIN Servico s ON a.idServico = s.idServico
WHERE a.idUsuario = 1;

-- 6. Ver histórico de compras de um usuário
SELECT * FROM Compra WHERE idUsuario = 1;

-- 7. Mostrar total gasto por cada usuário
SELECT 
    u.nome,
    SUM(p.valor) AS total_gasto
FROM 
    Usuario u
JOIN Compra c ON u.idUsuario = c.idUsuario
JOIN Pagamento p ON c.idCompra = p.idCompra
GROUP BY u.nome;
