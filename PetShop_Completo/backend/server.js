// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Rotas do backend
app.use("/usuarios", require("./routes/usuarios"));
app.use("/produtos", require("./routes/produtos"));
app.use("/servicos", require("./routes/servicos"));
app.use("/compras", require("./routes/compras"));
app.use("/pagamentos", require("./routes/pagamentos"));
app.use("/agendamentos", require("./routes/agendamentos"));

// Rota principal para carregar o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Petshop.html"));
});

// Inicializar servidor
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
