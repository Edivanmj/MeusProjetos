// backend/routes/usuarios.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Rota padrão: listar todos os usuários
router.get("/", (req, res) => {
  db.query("SELECT * FROM Usuario", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

// Nova rota: mostrar total gasto por usuário
router.get("/gastos", (req, res) => {
  const query = `
    SELECT u.nome, SUM(p.valor) AS total_gasto
    FROM Usuario u
    JOIN Compra c ON u.idUsuario = c.idUsuario
    JOIN Pagamento p ON c.idCompra = p.idCompra
    GROUP BY u.nome
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
