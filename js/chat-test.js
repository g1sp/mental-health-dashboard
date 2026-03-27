// Chat System Test Suite - Can run with or without API key
// Usage: Include this file, open DevTools, run tests

class ChatSystemTester {
    constructor() {
        this.results = [];
        this.passCount = 0;
        this.failCount = 0;
    }

    // Test helpers
    assert(condition, testName) {
        if (condition) {
            this.passCount++;
            this.log(`✅ PASS: ${testName}`);
            this.results.push({ test: testName, status: 'PASS' });
        } else {
            this.failCount++;
            this.log(`❌ FAIL: ${testName}`);
            this.results.push({ test: testName, status: 'FAIL' });
        }
    }

    log(message) {
        console.log(`[CHAT-TEST] ${message}`);
    }

    // Test 1: Handler Initialization
    testHandlerInitialization() {
        this.log('=== TEST 1: Handler Initialization ===');
        this.assert(typeof chatHandler !== 'undefined', 'chatHandler exists');
        this.assert(chatHandler instanceof ChatHandler, 'chatHandler is ChatHandler instance');
        this.assert(typeof chatHandler.crisisKeywords !== 'undefined', 'Crisis keywords defined');
        this.assert(chatHandler.crisisKeywords.length > 0, 'Crisis keywords not empty');
    }

    // Test 2: UI Initialization
    testUIInitialization() {
        this.log('=== TEST 2: UI Initialization ===');
        this.assert(typeof chatUI !== 'undefined', 'chatUI exists');
        this.assert(chatUI instanceof ChatUI, 'chatUI is ChatUI instance');
        this.assert(document.getElementById('chatMessages') !== null, 'Chat messages container exists');
        this.assert(document.getElementById('chatMessageInput') !== null, 'Chat input field exists');
    }

    // Test 3: Message Storage
    testMessageStorage() {
        this.log('=== TEST 3: Message Storage ===');

        // Clear history
        chatHandler.clearConversationHistory();
        this.assert(chatHandler.getConversationHistory().length === 0, 'History cleared');

        // Add message
        const msg = chatHandler.addMessage('user', 'Test message');
        this.assert(msg !== null, 'Message created');
        this.assert(msg.role === 'user', 'Message role correct');
        this.assert(msg.content === 'Test message', 'Message content correct');
        this.assert(chatHandler.getConversationHistory().length === 1, 'Message stored');

        // Check persistence
        const saved = chatHandler.getConversationHistory()[0];
        this.assert(saved.id === msg.id, 'Message ID persisted');
        this.assert(saved.timestamp !== null, 'Message timestamp exists');
    }

    // Test 4: Crisis Detection
    testCrisisDetection() {
        this.log('=== TEST 4: Crisis Detection ===');

        // Test normal message
        const normalMsg = "I'm feeling sad today";
        this.assert(!chatHandler.detectCrisis(normalMsg), 'Normal message not flagged');

        // Test crisis keywords
        const crisisMessages = [
            "I'm suicidal",
            "I want to hurt myself",
            "self harm thoughts",
            "I want to kill myself",
            "I'm hopeless"
        ];

        crisisMessages.forEach(msg => {
            const isCrisis = chatHandler.detectCrisis(msg);
            this.assert(isCrisis, `Crisis detected: "${msg}"`);
        });
    }

    // Test 5: Data Context Gathering
    testDataContext() {
        this.log('=== TEST 5: Data Context Gathering ===');

        const context = chatHandler.getUserContext();
        this.assert(context !== null, 'Context object created');
        this.assert('recentMood' in context, 'recentMood property exists');
        this.assert('moodTrend' in context, 'moodTrend property exists');
        this.assert('favoriteCopingSkills' in context, 'favoriteCopingSkills property exists');
        this.assert('recentEntries' in context, 'recentEntries property exists');
        this.assert('conditions' in context, 'conditions property exists');
        this.assert(Array.isArray(context.favoriteCopingSkills), 'Favorites is array');
        this.assert(Array.isArray(context.conditions), 'Conditions is array');
    }

    // Test 6: System Prompt Building
    testSystemPrompt() {
        this.log('=== TEST 6: System Prompt Building ===');

        const systemPrompt = chatHandler.buildSystemPrompt();
        this.assert(systemPrompt.length > 0, 'System prompt generated');
        this.assert(systemPrompt.includes('compassionate'), 'System prompt includes compassion');
        this.assert(systemPrompt.includes('AI companion'), 'System prompt identifies as companion');
        this.assert(systemPrompt.includes('CURRENT USER CONTEXT'), 'System prompt includes context');
    }

    // Test 7: Recommendation Engine
    testRecommendationEngine() {
        this.log('=== TEST 7: Recommendation Engine ===');

        const anxietyMsg = "I'm feeling anxious and worried";
        const suggestions = chatHandler.getRelevantCopingSkills(anxietyMsg);
        this.assert(Array.isArray(suggestions), 'Suggestions is array');
        this.assert(suggestions.length <= 2, 'Max 2 suggestions');

        const normalMsg = "Hello there";
        const noSuggestions = chatHandler.getRelevantCopingSkills(normalMsg);
        this.assert(Array.isArray(noSuggestions), 'Returns array even without matches');
    }

    // Test 8: Conversation Summary
    testConversationSummary() {
        this.log('=== TEST 8: Conversation Summary ===');

        // Clear and add messages
        chatHandler.clearConversationHistory();
        chatHandler.addMessage('user', 'I feel depressed');
        chatHandler.addMessage('assistant', 'I understand you are struggling');
        chatHandler.addMessage('user', 'Yes, also anxious about school');

        const summary = chatHandler.getConversationSummary();
        this.assert(summary !== null, 'Summary created');
        this.assert(summary.messageCount === 2, 'User message count correct');
        this.assert(Array.isArray(summary.topicsCovered), 'Topics array created');
    }

    // Test 9: UI Rendering
    testUIRendering() {
        this.log('=== TEST 9: UI Rendering ===');

        // Render conversation
        chatUI.renderConversation();
        const messagesContainer = document.getElementById('chatMessages');
        this.assert(messagesContainer !== null, 'Messages container exists');

        // Check if content rendered (welcome or messages)
        const hasContent = messagesContainer.children.length > 0;
        this.assert(hasContent, 'Messages rendered in container');
    }

    // Test 10: Event Listeners
    testEventListeners() {
        this.log('=== TEST 10: Event Listeners ===');

        const sendBtn = document.getElementById('chatSendBtn');
        const input = document.getElementById('chatMessageInput');
        const exportBtn = document.getElementById('chatExportBtn');
        const clearBtn = document.getElementById('chatClearBtn');

        this.assert(sendBtn !== null, 'Send button exists');
        this.assert(input !== null, 'Input field exists');
        this.assert(exportBtn !== null, 'Export button exists');
        this.assert(clearBtn !== null, 'Clear button exists');

        // Verify event listeners attached
        this.assert(sendBtn?.onclick !== null || sendBtn?.hasAttribute('onclick'), 'Send button has listener');
        this.assert(input?.onkeypress !== null || input?.hasAttribute('onkeypress'), 'Input has listener');
    }

    // Test 11: LocalStorage
    testLocalStorage() {
        this.log('=== TEST 11: LocalStorage ===');

        try {
            const key = 'test-key-' + Date.now();
            localStorage.setItem(key, 'test-value');
            const value = localStorage.getItem(key);
            this.assert(value === 'test-value', 'LocalStorage write/read works');
            localStorage.removeItem(key);
        } catch (error) {
            this.assert(false, 'LocalStorage available');
        }
    }

    // Test 12: HTML Structure
    testHTMLStructure() {
        this.log('=== TEST 12: HTML Structure ===');

        this.assert(document.getElementById('chatTab') !== null, 'Chat tab button exists');
        this.assert(document.getElementById('chatContent') !== null, 'Chat content pane exists');
        this.assert(document.getElementById('chatMessages') !== null, 'Messages display exists');
        this.assert(document.getElementById('chatMessageInput') !== null, 'Input field exists');
        this.assert(document.getElementById('chatSendBtn') !== null, 'Send button exists');
        this.assert(document.getElementById('apiKeyModal') !== null, 'API key modal exists');
    }

    // Test 13: API Key Handling
    testAPIKeyHandling() {
        this.log('=== TEST 13: API Key Handling ===');

        // Clear any existing key
        localStorage.removeItem('anthropic_api_key');
        chatHandler.apiKey = null;

        this.assert(chatHandler.apiKey === null, 'API key cleared');

        // Set test key
        const testKey = 'sk-ant-test-key-12345';
        chatHandler.apiKey = testKey;
        this.assert(chatHandler.apiKey === testKey, 'API key set');

        // Test localStorage
        localStorage.setItem('anthropic_api_key', testKey);
        const stored = localStorage.getItem('anthropic_api_key');
        this.assert(stored === testKey, 'API key stored in localStorage');

        // Clean up
        localStorage.removeItem('anthropic_api_key');
        chatHandler.apiKey = null;
    }

    // Test 14: Export Functionality
    testExportFunctionality() {
        this.log('=== TEST 14: Export Functionality ===');

        chatHandler.clearConversationHistory();
        chatHandler.addMessage('user', 'Test message 1');
        chatHandler.addMessage('assistant', 'Test response 1');

        const exported = chatHandler.exportConversation();
        this.assert(exported !== null, 'Export returns value');
        this.assert(typeof exported === 'string', 'Export is string');
        this.assert(exported.includes('Test message 1'), 'Export contains user message');
        this.assert(exported.includes('Test response 1'), 'Export contains assistant message');

        // Verify JSON format
        try {
            const parsed = JSON.parse(exported);
            this.assert(Array.isArray(parsed), 'Export is valid JSON array');
        } catch (e) {
            this.assert(false, 'Export is valid JSON');
        }
    }

    // Test 15: Integration with Other Handlers
    testHandlerIntegration() {
        this.log('=== TEST 15: Handler Integration ===');

        this.assert(typeof journalHandler !== 'undefined', 'journalHandler exists');
        this.assert(typeof copingHandler !== 'undefined', 'copingHandler exists');

        // Test that chat can access journal data
        if (journalHandler.entries) {
            this.assert(Array.isArray(journalHandler.entries), 'Journal entries are array');
        }

        // Test that chat can access coping skills
        if (typeof copingHandler.getCopingSkills === 'function') {
            this.assert(true, 'Coping handler has getCopingSkills');
        }
    }

    // Run all tests
    runAll() {
        console.clear();
        this.log('╔════════════════════════════════════════════════════════════╗');
        this.log('║        AI COMPANION CHAT - SYSTEM TEST SUITE               ║');
        this.log('╚════════════════════════════════════════════════════════════╝');
        this.log('');

        this.testHandlerInitialization();
        this.testUIInitialization();
        this.testMessageStorage();
        this.testCrisisDetection();
        this.testDataContext();
        this.testSystemPrompt();
        this.testRecommendationEngine();
        this.testConversationSummary();
        this.testUIRendering();
        this.testEventListeners();
        this.testLocalStorage();
        this.testHTMLStructure();
        this.testAPIKeyHandling();
        this.testExportFunctionality();
        this.testHandlerIntegration();

        // Summary
        this.log('');
        this.log('╔════════════════════════════════════════════════════════════╗');
        this.log(`║        TEST RESULTS: ${this.passCount} PASSED, ${this.failCount} FAILED              ║`);
        this.log('╚════════════════════════════════════════════════════════════╝');
        this.log('');

        if (this.failCount === 0) {
            this.log('✅ ALL TESTS PASSED! System is ready for deployment.');
        } else {
            this.log(`⚠️  ${this.failCount} test(s) failed. Review errors above.`);
        }

        return {
            passed: this.passCount,
            failed: this.failCount,
            total: this.passCount + this.failCount,
            results: this.results
        };
    }
}

// Create global instance
const chatTester = new ChatSystemTester();

// Convenience function
function testChat() {
    return chatTester.runAll();
}

console.log('✅ Chat test suite loaded. Run: testChat()');
