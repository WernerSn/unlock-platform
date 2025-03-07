let chatbot = null;
let messages = [];

function openChat() {
    chatbot = document.getElementById('chatbot');
    chatbot.classList.add('active');
}

function closeChat() {
    chatbot = document.getElementById('chatbot');
    chatbot.classList.remove('active');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage('user', message);
        input.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "I'll help you with that! Could you provide more details?",
                "Let me look that up for you...",
                "I understand your question. Here's what you can do...",
                "That's a great question! The solution is..."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage('bot', randomResponse);
        }, 1000);
    }
}

function addMessage(type, content) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${content}</p>
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    messages.push({ type, content });
}

// Handle enter key in chat input
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chatInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}); 