// AI Assistant Chat functionality

class SpaceTravelAssistant {
    constructor() {
        this.chatToggle = document.querySelector('.btn-chat-toggle');
        this.chatWindow = document.querySelector('.chat-window');
        this.chatMessages = document.querySelector('.chat-messages');
        this.chatInput = document.querySelector('.chat-input input');
        this.sendButton = document.querySelector('.btn-send');
        this.closeButton = document.querySelector('.btn-close');
        
        this.responses = {
            greeting: [
                "Hello! I'm your Space Travel Assistant. How can I help you today?",
                "Welcome to Dubai to the Stars! What would you like to know about space travel?",
                "Greetings, future space traveler! How can I assist you?"
            ],
            destinations: [
                "We offer trips to the International Space Station, Lunar Hotel, and Mars Station.",
                "Our destinations include: ISS (3 days), Lunar Hotel (7 days), and Mars Station (30 days).",
                "You can choose from our three main destinations. Would you like to know more about any specific one?"
            ],
            pricing: [
                "Our prices range from $500,000 for ISS trips to $2,000,000 for Mars Station stays.",
                "We offer different pricing tiers based on destination and duration. Would you like to see our current rates?",
                "Prices vary by destination and include all necessary training and equipment."
            ],
            preparation: [
                "Space travel requires special preparation. We'll provide comprehensive training before your journey.",
                "You'll need to undergo physical and mental preparation. We'll guide you through the entire process.",
                "Our preparation program includes fitness training, zero-gravity simulation, and safety protocols."
            ],
            default: [
                "I'm not sure about that. Would you like to know about our destinations or pricing?",
                "Could you please rephrase that? I'm here to help with space travel information.",
                "Let me know if you'd like information about destinations, pricing, or preparation."
            ]
        };
        
        this.initializeEventListeners();
        this.addWelcomeMessage();
    }
    
    initializeEventListeners() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.toggleChat());
        this.sendButton.addEventListener('click', () => this.handleUserInput());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserInput();
            }
        });
    }
    
    toggleChat() {
        this.chatWindow.classList.toggle('active');
        if (this.chatWindow.classList.contains('active')) {
            this.chatInput.focus();
        }
    }
    
    addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${isUser ? 'user' : 'assistant'}`;
        messageElement.textContent = message;
        this.chatMessages.appendChild(messageElement);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    addWelcomeMessage() {
        const welcomeMessage = this.responses.greeting[Math.floor(Math.random() * this.responses.greeting.length)];
        this.addMessage(welcomeMessage);
    }
    
    handleUserInput() {
        const userInput = this.chatInput.value.trim();
        if (!userInput) return;
        
        this.addMessage(userInput, true);
        this.chatInput.value = '';
        
        // Simulate AI response delay
        setTimeout(() => {
            const response = this.generateResponse(userInput.toLowerCase());
            this.addMessage(response);
        }, 1000);
    }
    
    generateResponse(userInput) {
        // Simple keyword-based response system
        if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
            return this.responses.greeting[Math.floor(Math.random() * this.responses.greeting.length)];
        }
        
        if (userInput.includes('destination') || userInput.includes('where') || userInput.includes('go')) {
            return this.responses.destinations[Math.floor(Math.random() * this.responses.destinations.length)];
        }
        
        if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('expensive')) {
            return this.responses.pricing[Math.floor(Math.random() * this.responses.pricing.length)];
        }
        
        if (userInput.includes('prepare') || userInput.includes('training') || userInput.includes('ready')) {
            return this.responses.preparation[Math.floor(Math.random() * this.responses.preparation.length)];
        }
        
        return this.responses.default[Math.floor(Math.random() * this.responses.default.length)];
    }
}

// Initialize the AI Assistant when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SpaceTravelAssistant();
}); 