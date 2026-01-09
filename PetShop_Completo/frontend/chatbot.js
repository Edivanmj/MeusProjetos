// Chatbot functionality
class Chatbot {
    constructor() {
        this.messages = [];
        this.isOpen = false;
        this.apiUrl = '/chatbot';
        this.init();
    }

    init() {
        // Create chatbot UI
        this.createChatbotUI();
        
        // Add event listeners
        this.addEventListeners();
        
        // Load suggestions
        this.loadSuggestions();
        
        // Send welcome message
        this.addBotMessage("Olá! 👋 Bem-vindo ao PetShop Premium! Como posso ajudá-lo hoje?");
    }

    createChatbotUI() {
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-button" id="chatbot-toggle">
                    <span class="chatbot-icon">💬</span>
                </button>
                
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-content">
                            <div class="chatbot-avatar">🐾</div>
                            <div class="chatbot-title">
                                <h3>Assistente Virtual</h3>
                                <p>Online agora</p>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbot-close">×</button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="chatbot-typing" id="chatbot-typing">
                        <div class="typing-dots">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                    
                    <div class="chatbot-suggestions" id="chatbot-suggestions">
                        <!-- Suggestions will be added here -->
                    </div>
                    
                    <div class="chatbot-input-container">
                        <input 
                            type="text" 
                            class="chatbot-input" 
                            id="chatbot-input" 
                            placeholder="Digite sua mensagem..."
                            autocomplete="off"
                        />
                        <button class="chatbot-send" id="chatbot-send">
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    addEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        toggleBtn.addEventListener('click', () => this.toggleChatbot());
        closeBtn.addEventListener('click', () => this.closeChatbot());
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.add('open');
            document.getElementById('chatbot-input').focus();
        } else {
            window.classList.remove('open');
        }
    }

    closeChatbot() {
        const window = document.getElementById('chatbot-window');
        window.classList.remove('open');
        this.isOpen = false;
    }

    async loadSuggestions() {
        try {
            const response = await fetch(`${this.apiUrl}/suggestions`);
            const data = await response.json();
            
            const suggestionsContainer = document.getElementById('chatbot-suggestions');
            suggestionsContainer.innerHTML = '';
            
            data.suggestions.forEach(suggestion => {
                const chip = document.createElement('button');
                chip.className = 'suggestion-chip';
                chip.textContent = suggestion;
                chip.addEventListener('click', () => {
                    document.getElementById('chatbot-input').value = suggestion;
                    this.sendMessage();
                });
                suggestionsContainer.appendChild(chip);
            });
        } catch (error) {
            console.error('Error loading suggestions:', error);
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addUserMessage(message);
        
        // Clear input
        input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        try {
            // Send message to backend
            const response = await fetch(`${this.apiUrl}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            
            const data = await response.json();
            
            // Hide typing indicator
            this.hideTyping();
            
            // Add bot response
            this.addBotMessage(data.message);
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.hideTyping();
            this.addBotMessage('Desculpe, ocorreu um erro. Por favor, tente novamente.');
        }
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message user';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = message;
        
        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);
        
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message bot';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = message;
        
        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);
        
        this.scrollToBottom();
    }

    showTyping() {
        const typingIndicator = document.getElementById('chatbot-typing');
        typingIndicator.classList.add('active');
        this.scrollToBottom();
    }

    hideTyping() {
        const typingIndicator = document.getElementById('chatbot-typing');
        typingIndicator.classList.remove('active');
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
