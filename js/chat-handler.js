// AI Mental Health Companion Chat Handler

class ChatHandler {
    constructor() {
        this.conversationHistory = [];
        this.storageKey = 'mentalHealthChat';
        this.apiKey = null;
        this.isLoading = false;
        this.crisisKeywords = [
            'suicide', 'suicidal', 'kill myself', 'end it', 'hurt myself',
            'self harm', 'cutting', 'self-harm', 'harm', 'harm myself',
            'die', 'death', 'dead', 'gone', 'severe pain', 'can\'t take it',
            'unbearable', 'hopeless', 'worthless', 'no point', 'no reason to live'
        ];
    }

    // Initialize chat handler - loads API key and conversation history
    async init() {
        // Load API key from environment (set in settings or hardcoded for demo)
        this.apiKey = localStorage.getItem('anthropic_api_key');

        // Load conversation history
        this.loadConversationHistory();

        return true;
    }

    // Load conversation history from local storage
    loadConversationHistory() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.conversationHistory = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading chat history:', error);
            this.conversationHistory = [];
        }
    }

    // Save conversation to local storage
    saveConversationHistory() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    // Add a message to conversation
    addMessage(role, content, metadata = {}) {
        const message = {
            id: Date.now(),
            role: role, // 'user' or 'assistant'
            content: content,
            timestamp: new Date().toISOString(),
            metadata: metadata
        };
        this.conversationHistory.push(message);
        this.saveConversationHistory();
        return message;
    }

    // Detect crisis language in user message
    detectCrisis(userMessage) {
        const lowercaseMsg = userMessage.toLowerCase();
        return this.crisisKeywords.some(keyword => lowercaseMsg.includes(keyword));
    }

    // Get user context from their data
    getUserContext() {
        let context = {
            recentMood: null,
            moodTrend: null,
            favoriteCopingSkills: [],
            recentEntries: [],
            conditions: []
        };

        // Get recent journal entries if available
        if (typeof journalHandler !== 'undefined') {
            const stats = journalHandler.getMoodStats(30);
            context.recentMood = stats ? stats.average : null;
            context.moodTrend = stats ? stats.trend : 'stable';

            // Get last 3 entries
            context.recentEntries = journalHandler.entries.slice(-3).map(e => ({
                mood: e.mood,
                condition: e.condition,
                date: e.date
            }));

            // Detect conditions from entries
            const uniqueConditions = [...new Set(journalHandler.entries.map(e => e.condition).filter(c => c))];
            context.conditions = uniqueConditions;
        }

        // Get favorite coping skills if available
        if (typeof copingHandler !== 'undefined') {
            const favorites = copingHandler.getFavorites();
            context.favoriteCopingSkills = favorites.slice(0, 3).map(f => ({
                id: f.id,
                name: f.name
            }));
        }

        return context;
    }

    // Format user context into a system prompt
    buildSystemPrompt() {
        const userContext = this.getUserContext();
        let systemPrompt = `You are a compassionate, empathetic AI mental health companion. You provide supportive conversations with teenagers about their mental health.

IMPORTANT GUIDELINES:
- Be warm, understanding, and non-judgmental
- Listen actively and ask follow-up questions
- Validate their feelings and experiences
- Suggest specific coping strategies when appropriate
- If user shows crisis signs, immediately encourage them to contact crisis resources (988 or 911)
- Keep responses concise (2-3 sentences usually)
- Use age-appropriate language for teenagers
- Never diagnose, but can normalize experiences
- Focus on what they can do right now to feel better

CURRENT USER CONTEXT:`;

        if (userContext.recentMood) {
            systemPrompt += `\n- Current mood: ${userContext.recentMood}/10`;
        }
        if (userContext.moodTrend) {
            systemPrompt += `\n- Mood trend: ${userContext.moodTrend}`;
        }
        if (userContext.conditions.length > 0) {
            systemPrompt += `\n- They've mentioned dealing with: ${userContext.conditions.join(', ')}`;
        }
        if (userContext.favoriteCopingSkills.length > 0) {
            systemPrompt += `\n- Favorite coping skills: ${userContext.favoriteCopingSkills.map(s => s.name).join(', ')}`;
        }

        return systemPrompt;
    }

    // Get relevant coping skill suggestions based on conversation
    getRelevantCopingSkills(userMessage) {
        if (typeof copingHandler === 'undefined') return [];

        const keywords = userMessage.toLowerCase();
        const allSkills = copingHandler.getCopingSkills();

        // Simple keyword matching
        const relevant = allSkills.filter(skill => {
            const skillText = (skill.name + ' ' + skill.description + ' ' + skill.for_conditions.join(' ')).toLowerCase();
            return keywords.includes(skill.category) ||
                   skill.for_conditions.some(cond => keywords.includes(cond));
        });

        return relevant.slice(0, 2); // Return top 2
    }

    // Send message to Claude API
    async sendMessage(userMessage) {
        if (!this.apiKey) {
            console.error('API key not set. Chat not available.');
            return null;
        }

        // Check for crisis
        const isCrisis = this.detectCrisis(userMessage);

        // Add user message to history
        this.addMessage('user', userMessage, { isCrisis });

        // Set loading state
        this.isLoading = true;

        try {
            // Build messages array for Claude
            const messages = this.conversationHistory
                .filter(m => m.role !== 'metadata') // Filter out metadata
                .map(m => ({
                    role: m.role,
                    content: m.content
                }));

            // Call Anthropic API
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-opus-4-6',
                    max_tokens: 500,
                    system: this.buildSystemPrompt(),
                    messages: messages
                })
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('API Error:', error);
                throw new Error(error.error?.message || 'API request failed');
            }

            const data = await response.json();
            const assistantMessage = data.content[0].text;

            // Add assistant response to history
            const suggestedSkills = this.getRelevantCopingSkills(userMessage);
            this.addMessage('assistant', assistantMessage, {
                isCrisis,
                suggestedSkills: suggestedSkills
            });

            this.isLoading = false;

            return {
                message: assistantMessage,
                isCrisis: isCrisis,
                suggestedSkills: suggestedSkills
            };

        } catch (error) {
            console.error('Error sending message:', error);
            this.isLoading = false;

            // Add error response
            this.addMessage('assistant', 'I encountered an error. Please try again or reach out to crisis resources if you need immediate help.', {
                isError: true
            });

            return null;
        }
    }

    // Get conversation history
    getConversationHistory() {
        return this.conversationHistory;
    }

    // Clear conversation history
    clearConversationHistory() {
        this.conversationHistory = [];
        this.saveConversationHistory();
    }

    // Export conversation
    exportConversation() {
        return JSON.stringify(this.conversationHistory, null, 2);
    }

    // Get conversation summary
    getConversationSummary() {
        const messages = this.conversationHistory.filter(m => m.role === 'user');
        const topicsCovered = new Set();

        const topics = {
            mood: ['feeling', 'feel', 'mood', 'emotion'],
            anxiety: ['anxiety', 'anxious', 'worried', 'stress'],
            depression: ['depression', 'depressed', 'sad', 'unhappy'],
            selfHarm: ['hurt', 'harm', 'cut', 'self'],
            relationships: ['friend', 'family', 'relationship', 'parent'],
            school: ['school', 'grade', 'homework', 'exam', 'test']
        };

        messages.forEach(msg => {
            const text = msg.content.toLowerCase();
            Object.keys(topics).forEach(topic => {
                if (topics[topic].some(keyword => text.includes(keyword))) {
                    topicsCovered.add(topic);
                }
            });
        });

        return {
            messageCount: messages.length,
            topicsCovered: Array.from(topicsCovered),
            lastMessage: messages[messages.length - 1]?.timestamp
        };
    }
}

// Create global instance
const chatHandler = new ChatHandler();
