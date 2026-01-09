
    function finalizarCompra() {
      const totalTexto = document.getElementById("total").textContent;
      const valor = parseFloat(totalTexto.replace("R$", "").replace(",", "."));

      fetch("http://localhost:3000/compras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUsuario: 1,   // depois você pode pegar o usuário logado
          status: "Pendente",
          valor: valor
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("Compra registrada:", data);
        alert("Compra registrada com sucesso!");
      })
      .catch(err => console.error("Erro:", err));
    }
//mercado pago

  const mp = new MercadoPago('SUA_PUBLIC_KEY', {
    locale: 'pt-BR'
  });

  document.getElementById('checkout-button').addEventListener('click', () => {
    fetch('http://localhost:3000/criar-preferencia', {
      method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
      mp.checkout({
        preference: {
          id: data.id
        },
        autoOpen: true
      });
    });
  });


