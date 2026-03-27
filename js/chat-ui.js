// AI Mental Health Companion Chat UI

class ChatUI {
    constructor() {
        this.chatContainer = null;
        this.messageInput = null;
        this.sendButton = null;
        this.messagesDisplay = null;
        this.isInitialized = false;
    }

    // Initialize chat UI
    init() {
        // Get DOM elements
        this.chatContainer = document.getElementById('chatContainer');
        this.messageInput = document.getElementById('chatMessageInput');
        this.sendButton = document.getElementById('chatSendBtn');
        this.messagesDisplay = document.getElementById('chatMessages');

        if (!this.chatContainer || !this.messageInput || !this.sendButton || !this.messagesDisplay) {
            console.warn('Chat UI elements not found in DOM');
            return false;
        }

        // Set up event listeners
        this.setupEventListeners();

        // Display existing conversation
        this.renderConversation();

        this.isInitialized = true;
        return true;
    }

    // Setup event listeners
    setupEventListeners() {
        this.sendButton?.addEventListener('click', () => this.handleSendMessage());
        this.messageInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
    }

    // Handle send message
    async handleSendMessage() {
        const message = this.messageInput?.value.trim();

        if (!message) return;

        // Check if API key is set
        if (!chatHandler.apiKey) {
            this.showApiKeyPrompt();
            return;
        }

        // Clear input
        if (this.messageInput) {
            this.messageInput.value = '';
        }

        // Disable send button
        if (this.sendButton) {
            this.sendButton.disabled = true;
        }

        // Display user message immediately
        this.displayMessage('user', message);

        // Send to Claude
        const response = await chatHandler.sendMessage(message);

        // Re-enable send button
        if (this.sendButton) {
            this.sendButton.disabled = false;
        }

        if (response) {
            // Check for crisis
            if (response.isCrisis) {
                this.displayCrisisAlert();
            }

            // Display assistant message
            this.displayMessage('assistant', response.message);

            // Display suggested skills if any
            if (response.suggestedSkills && response.suggestedSkills.length > 0) {
                this.displaySuggestedSkills(response.suggestedSkills);
            }
        }

        // Auto-scroll to bottom
        this.scrollToBottom();
    }

    // Display a message in the chat
    displayMessage(role, content) {
        if (!this.messagesDisplay) return;

        const messageEl = document.createElement('div');
        messageEl.className = `chat-message chat-message-${role}`;
        messageEl.innerHTML = `
            <div class="chat-message-content">
                <span class="chat-message-avatar">${role === 'user' ? '👤' : '🤖'}</span>
                <div class="chat-message-text">${this.escapeHtml(content)}</div>
            </div>
        `;

        this.messagesDisplay.appendChild(messageEl);
    }

    // Display suggested coping skills
    displaySuggestedSkills(skills) {
        if (!this.messagesDisplay || skills.length === 0) return;

        const suggestedEl = document.createElement('div');
        suggestedEl.className = 'chat-suggested-skills';
        suggestedEl.innerHTML = '<p class="mb-2"><strong>💡 Try these exercises:</strong></p>';

        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'd-flex gap-2 flex-wrap';

        skills.forEach(skill => {
            const skillBtn = document.createElement('button');
            skillBtn.className = 'btn btn-sm btn-outline-primary';
            skillBtn.textContent = skill.name;
            skillBtn.addEventListener('click', () => {
                // Open coping exercise modal without switching tabs
                if (typeof copingUI !== 'undefined' && skill.id) {
                    copingUI.showExerciseDetail(skill.id);
                }
            });
            skillsContainer.appendChild(skillBtn);
        });

        suggestedEl.appendChild(skillsContainer);
        this.messagesDisplay.appendChild(suggestedEl);
    }

    // Display crisis alert
    displayCrisisAlert() {
        if (!this.messagesDisplay) return;

        const alertEl = document.createElement('div');
        alertEl.className = 'alert alert-danger alert-dismissible fade show';
        alertEl.innerHTML = `
            <strong>🆘 We're here for you</strong>
            <p class="mb-2 mt-2">If you're in crisis, please reach out to someone who can help:</p>
            <p class="mb-1"><strong>Call or Text 988</strong> - Suicide & Crisis Lifeline (24/7)</p>
            <p class="mb-0"><strong>Call 911</strong> - If in immediate danger</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        this.messagesDisplay.appendChild(alertEl);
    }

    // Show API key prompt
    showApiKeyPrompt() {
        const modal = document.getElementById('apiKeyModal');
        if (modal) {
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        } else {
            const apiKey = prompt('Please enter your Anthropic API key to use the chat feature:');
            if (apiKey) {
                chatHandler.apiKey = apiKey;
                localStorage.setItem('anthropic_api_key', apiKey);
                this.handleSendMessage();
            }
        }
    }

    // Render full conversation
    renderConversation() {
        if (!this.messagesDisplay) return;

        // Clear existing messages
        this.messagesDisplay.innerHTML = '';

        // Display welcome message if no history
        const history = chatHandler.getConversationHistory();
        if (history.length === 0) {
            const welcomeEl = document.createElement('div');
            welcomeEl.className = 'chat-welcome';
            welcomeEl.innerHTML = `
                <div class="text-center py-4">
                    <h5>👋 Welcome to Your AI Companion</h5>
                    <p class="text-muted">I'm here to listen and support you. Tell me what's on your mind.</p>
                    <p class="text-muted small">💬 This conversation is private and stays on your device.</p>
                </div>
            `;
            this.messagesDisplay.appendChild(welcomeEl);
            return;
        }

        // Render all messages
        history.forEach(msg => {
            if (msg.role === 'user' || msg.role === 'assistant') {
                this.displayMessage(msg.role, msg.content);

                // Display suggested skills if in metadata
                if (msg.metadata?.suggestedSkills?.length > 0) {
                    this.displaySuggestedSkills(msg.metadata.suggestedSkills);
                }
            }
        });
    }

    // Scroll to bottom of chat
    scrollToBottom() {
        if (this.messagesDisplay) {
            this.messagesDisplay.scrollTop = this.messagesDisplay.scrollHeight;
        }
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Clear chat
    clearChat() {
        if (confirm('Are you sure? This will delete all chat history.')) {
            chatHandler.clearConversationHistory();
            this.renderConversation();
        }
    }

    // Export chat
    exportChat() {
        const data = chatHandler.exportConversation();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-export-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Get conversation summary
    getSummary() {
        return chatHandler.getConversationSummary();
    }
}

// Create global instance
const chatUI = new ChatUI();
