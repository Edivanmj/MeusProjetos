// backend/routes/chatbot.js
const express = require("express");
const router = express.Router();

// Knowledge base for the chatbot
const knowledgeBase = {
  // Greetings
  greetings: ["olá", "oi", "ola", "bom dia", "boa tarde", "boa noite", "hey", "ei"],
  
  // Products related
  products: ["produto", "produtos", "ração", "racao", "brinquedo", "brinquedos", "casa", "osso"],
  
  // Prices related
  prices: ["preço", "preco", "valor", "custa", "quanto"],
  
  // Hours related
  hours: ["horário", "horario", "hora", "aberto", "fecha", "abre"],
  
  // Contact related
  contact: ["contato", "telefone", "email", "whatsapp", "falar"],
  
  // Shipping related
  shipping: ["entrega", "envio", "frete", "prazo", "envia"],
  
  // Payment related
  payment: ["pagamento", "pagar", "cartão", "cartao", "pix", "boleto", "aceitam"],
  
  // Help related
  help: ["ajuda", "ajudar", "dúvida", "duvida", "como"],
};

// Response templates
const responses = {
  greeting: "Olá! 👋 Bem-vindo ao PetShop Premium! Como posso ajudá-lo hoje?",
  
  products: "Temos uma grande variedade de produtos para seu pet! 🐾\n\n" +
    "• Ração Premium para Gatos - R$ 45,90\n" +
    "• Osso Natural Premium - R$ 20,00\n" +
    "• Bola Interativa - R$ 15,90\n" +
    "• Casa Confortável - R$ 89,90\n\n" +
    "E muito mais! Navegue pela nossa loja para ver todos os produtos.",
  
  prices: "Nossos preços são competitivos! 💰\n\n" +
    "Alguns exemplos:\n" +
    "• Ração Premium Gatos: R$ 45,90\n" +
    "• Osso Natural Premium: R$ 20,00 (com 20% de desconto!)\n" +
    "• Bola Interativa: R$ 15,90\n" +
    "• Casa Confortável: R$ 89,90\n\n" +
    "Tem sempre promoções especiais! 🎉",
  
  hours: "Nosso horário de atendimento é:\n\n" +
    "📅 Segunda a Sexta: 8h às 18h\n" +
    "📅 Sábado: 8h às 14h\n" +
    "📅 Domingo: Fechado\n\n" +
    "A loja online está disponível 24/7! 🌐",
  
  contact: "Entre em contato conosco:\n\n" +
    "📞 Telefone: (11) 9999-9999\n" +
    "📧 Email: contato@petshop.com\n" +
    "💬 WhatsApp: (11) 9999-9999\n\n" +
    "Estamos aqui para ajudar! 😊",
  
  shipping: "Informações sobre entrega:\n\n" +
    "📦 Entrega rápida em toda a região\n" +
    "🚚 Frete GRÁTIS para compras acima de R$ 100,00\n" +
    "⏱️ Prazo de entrega: 2-5 dias úteis\n" +
    "📍 Entregamos em todo o Brasil\n\n" +
    "Rastreamento disponível para todos os pedidos!",
  
  payment: "Formas de pagamento aceitas:\n\n" +
    "💳 Cartão de Crédito (todas as bandeiras)\n" +
    "💳 Cartão de Débito\n" +
    "📱 PIX (desconto de 5%!)\n" +
    "🧾 Boleto Bancário\n" +
    "💰 Mercado Pago\n\n" +
    "Pagamento 100% seguro! 🔒",
  
  help: "Como posso ajudar você? 🤔\n\n" +
    "Você pode me perguntar sobre:\n" +
    "• Produtos e preços\n" +
    "• Horário de funcionamento\n" +
    "• Formas de pagamento\n" +
    "• Entrega e frete\n" +
    "• Informações de contato\n\n" +
    "Digite sua dúvida e eu responderei!",
  
  default: "Desculpe, não entendi sua pergunta. 😅\n\n" +
    "Você pode perguntar sobre:\n" +
    "• Produtos e preços 🛍️\n" +
    "• Horário de atendimento 🕐\n" +
    "• Formas de pagamento 💳\n" +
    "• Entrega e frete 📦\n" +
    "• Contato 📞\n\n" +
    "Como posso ajudar?"
};

// Function to determine the intent of the user message
function determineIntent(message) {
  const lowerMessage = message.toLowerCase().trim();
  
  // Check for more specific intents first before greetings
  
  // Check for products
  if (knowledgeBase.products.some(keyword => lowerMessage.includes(keyword))) {
    return "products";
  }
  
  // Check for prices
  if (knowledgeBase.prices.some(keyword => lowerMessage.includes(keyword))) {
    return "prices";
  }
  
  // Check for hours
  if (knowledgeBase.hours.some(keyword => lowerMessage.includes(keyword))) {
    return "hours";
  }
  
  // Check for contact
  if (knowledgeBase.contact.some(keyword => lowerMessage.includes(keyword))) {
    return "contact";
  }
  
  // Check for shipping
  if (knowledgeBase.shipping.some(keyword => lowerMessage.includes(keyword))) {
    return "shipping";
  }
  
  // Check for payment
  if (knowledgeBase.payment.some(keyword => lowerMessage.includes(keyword))) {
    return "payment";
  }
  
  // Check for help
  if (knowledgeBase.help.some(keyword => lowerMessage.includes(keyword))) {
    return "help";
  }
  
  // Check for greetings last (only if message is short and simple)
  if (lowerMessage.length < 20 && knowledgeBase.greetings.some(greeting => lowerMessage.includes(greeting))) {
    return "greeting";
  }
  
  return "default";
}

// POST endpoint to handle chatbot messages
router.post("/message", (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        error: "Mensagem é obrigatória" 
      });
    }
    
    // Determine intent and get response
    const intent = determineIntent(message);
    const response = responses[intent];
    
    // Simulate a slight delay to make it feel more natural
    setTimeout(() => {
      res.json({
        message: response,
        intent: intent,
        timestamp: new Date().toISOString()
      });
    }, 500);
    
  } catch (error) {
    console.error("Erro no chatbot:", error);
    res.status(500).json({ 
      error: "Erro ao processar mensagem",
      message: responses.default
    });
  }
});

// GET endpoint to get suggested questions
router.get("/suggestions", (req, res) => {
  const suggestions = [
    "Quais produtos vocês têm?",
    "Qual o horário de funcionamento?",
    "Quais as formas de pagamento?",
    "Como funciona a entrega?",
    "Preciso de ajuda"
  ];
  
  res.json({ suggestions });
});

module.exports = router;
