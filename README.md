# 🐾 PetShop Online

O **PetShop Online** é um sistema web desenvolvido em **Node.js + Express** com frontend em **HTML/CSS/JavaScript** e banco de dados **SQL**.  
Ele foi criado para oferecer uma experiência prática e completa para tutores de animais de estimação, permitindo compras de produtos, agendamento de serviços e pagamentos online.

---

## 🚀 Funcionalidades

- **Gerenciamento de Usuários** (`/usuarios`)
- **Catálogo de Produtos** (`/produtos`)
- **Serviços de PetShop** (`/servicos`)
- **Registro de Compras** (`/compras`)
- **Pagamentos Seguros via MercadoPago** (`/pagamentos`)
- **Agendamento de Serviços** (`/agendamentos`)
- **Frontend integrado**: HTML responsivo servido pelo backend (`petshop.html`)

---

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express, CORS, Body-Parser
- **Banco de Dados**: SQL (MySQL/PostgreSQL)
- **Pagamentos**: SDK MercadoPago
- **Frontend**: HTML, CSS, JavaScript
- **Ferramentas**: Nodemon para desenvolvimento

---

## 📂 Estrutura de Pastas

PetShop_Completo/ ├── backend/ │ ├── server.js │ ├── routes/ │ │ ├── usuarios.js │ │ ├── produtos.js │ │ ├── servicos.js │ │ ├── compras.js │ │ ├── pagamentos.js │ │ └── agendamentos.js └── frontend/ ├── petshop.html ├── css/ └── js


---

## ⚙️ Como Rodar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/seuusuario/petshop.git
cd PetShop_Completo/backend
npm install

Configure sua chave de acesso do MercadoPago em routes/pagamentos.js:

const client = new mercadopago.MercadoPagoConfig({
  accessToken: "SEU_TOKEN_AQUI"
});

node server.js
nodemon server.js
http://localhost:3000



CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255)
);

CREATE TABLE produtos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  preco DECIMAL(10,2),
  estoque INT
);

CREATE TABLE compras (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT,
  produto_id INT,
  quantidade INT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

Projeto desenvolvido para estudo e prática de integração frontend + backend + banco de dados + pagamentos online.

