# AI Companion Chat - Agent Architecture Guide

## Overview

The AI Companion Chat system uses **6 coordinated agents** that work together to provide intelligent, context-aware mental health support. These agents operate in parallel and communicate to deliver a seamless conversational experience.

---

## The 6 Active Agents

### 1. **Main Orchestrator Agent** (`chat-handler.js`)
**Role**: Central nervous system of the chat system

**Responsibilities**:
- Manages the conversation flow and message queue
- Maintains conversation history in local storage
- Routes user messages through the processing pipeline
- Coordinates between other agents
- Handles API calls to Claude

**Key Methods**:
- `sendMessage(userMessage)` - Main entry point
- `addMessage(role, content)` - Adds to conversation history
- `saveConversationHistory()` - Persists to storage
- `detectCrisis(userMessage)` - Initial crisis screening

**Data Flow**:
```
User Input → Orchestrator → Crisis Detector → Data Context Agent → Claude → Response
```

---

### 2. **Claude AI Agent** (via Anthropic API)
**Role**: The empathetic conversational partner

**Responsibilities**:
- Generates natural, therapeutic responses
- Understands context across multiple turns
- Adapts tone based on user's emotional state
- Provides validation and support
- Suggests coping strategies conversationally

**Configuration**:
```javascript
{
    model: 'claude-opus-4-6',
    max_tokens: 500,
    temperature: 0.7 (natural but coherent responses)
}
```

**System Prompt Includes**:
- Role definition: compassionate AI companion
- User's current mood and trend
- Recent mental health conditions
- Favorite coping exercises
- Crisis detection instructions

**Example Interaction**:
```
User: "I've been feeling really anxious lately"
Claude: "That sounds really tough. Anxiety can feel overwhelming.
         What's been triggering it for you? Sometimes understanding
         the pattern helps us address it."
```

---

### 3. **Data Context Agent** (embedded in `chat-handler.js`)
**Role**: Gathers intelligence about the user

**Responsibilities**:
- Retrieves recent journal entries
- Calculates mood trends (last 7-30 days)
- Identifies favorite coping exercises
- Detects recurring conditions
- Builds user profile summary

**Integration Points**:
- Reads from `journalHandler.entries`
- Accesses `journalHandler.getMoodStats()`
- Accesses `copingHandler.getFavorites()`

**Context Example**:
```javascript
{
    recentMood: 6/10,
    moodTrend: 'improving',
    conditions: ['anxiety', 'stress'],
    favoriteCopingSkills: [
        { id: 1, name: 'Box Breathing' },
        { id: 5, name: '5-4-3-2-1 Grounding' }
    ],
    recentEntries: [...]
}
```

**How It's Used**:
- Personalizes Claude's responses
- Allows AI to reference "I remember you like box breathing..."
- Helps detect if mood is improving/declining
- Informs recommendation suggestions

---

### 4. **Recommendation Engine Agent** (in `chat-handler.js`)
**Role**: Suggests relevant resources

**Responsibilities**:
- Analyzes user's current concern
- Matches to relevant coping exercises
- Ranks by effectiveness and user preference
- Returns skill IDs for quick access
- Integrates seamlessly into conversation

**Algorithm**:
1. Tokenize user message into keywords
2. Match against coping skill categories & conditions
3. Prioritize favorite exercises
4. Filter by difficulty (progress path)
5. Return top 2 relevant skills

**Trigger Conditions**:
- User mentions anxiety → suggests breathing exercises
- User mentions sadness → suggests mindfulness or grounding
- User mentions stress → suggests physical activities
- Based on user's selected condition in journal

**Example Output**:
```javascript
[
    { id: 1, name: 'Box Breathing', category: 'breathing' },
    { id: 8, name: '5-4-3-2-1 Grounding', category: 'grounding' }
]
```

---

### 5. **Crisis Detection Agent** (in `chat-handler.js`)
**Role**: Monitors for danger signals

**Responsibilities**:
- Scans every user message for crisis keywords
- Identifies patterns suggesting acute distress
- Escalates to crisis resources when needed
- Interrupts normal chat flow for safety
- Provides immediate crisis resources

**Crisis Keywords Monitored**:
- Suicidal ideation: "suicide", "kill myself", "end it"
- Self-harm: "self harm", "cutting", "hurt myself"
- Severe distress: "hopeless", "worthless", "can't take it"
- Existential crisis: "no point", "no reason to live"

**Response Protocol**:
1. Detect crisis keyword in message
2. Flag message with `isCrisis: true`
3. Display crisis alert in chat UI
4. Suggest calling 988 or 911
5. Show state-specific crisis resources
6. Claude responds with crisis-aware empathy

**Safety First**:
```javascript
if (this.detectCrisis(userMessage)) {
    // Immediate escalation to crisis resources
    // No delay - safety priority
}
```

---

### 6. **UI Renderer Agent** (`chat-ui.js`)
**Role**: Displays everything on screen

**Responsibilities**:
- Renders messages with proper styling
- Shows suggested coping skills as inline buttons
- Displays crisis alerts prominently
- Manages chat history scrolling
- Handles input validation
- Manages loading states

**UI Components**:
1. **Message Display**
   - User messages: right-aligned, blue background
   - AI messages: left-aligned, gray background
   - Smooth slide-in animation

2. **Suggested Skills**
   - Light blue box with icon
   - Clickable buttons for each suggestion
   - Directly opens exercise modal in coping tab

3. **Crisis Alert**
   - Red danger alert
   - Shows 988 number prominently
   - Suggests emergency resources
   - Dismissible but persistent if needed

4. **Input Area**
   - Textarea with multi-line support
   - Send button
   - Shift+Enter for new line, Enter to send
   - Shows privacy notice

---

## Agent Coordination Flow

### Conversation Lifecycle

```
1. USER ENTERS MESSAGE
   ↓
2. ORCHESTRATOR AGENT
   - Adds message to history
   - Validates input
   ↓
3. CRISIS DETECTION AGENT
   - Scans for keywords
   - Sets crisis flag if needed
   ↓
4. DATA CONTEXT AGENT
   - Gathers user data
   - Builds context summary
   ↓
5. CLAUDE AI AGENT
   - Receives context-enhanced prompt
   - Generates empathetic response
   - Considers crisis status
   ↓
6. RECOMMENDATION ENGINE AGENT
   - Analyzes message for relevant skills
   - Finds top 2 matches
   ↓
7. UI RENDERER AGENT
   - Displays AI response
   - Shows suggested skills (if any)
   - Displays crisis alert (if triggered)
   - Scrolls to newest message
   ↓
8. ORCHESTRATOR AGENT
   - Saves updated conversation
   - Returns to waiting state
```

### Example: Anxiety Conversation

**User**: "I've been so anxious I can't sleep"

1. **Orchestrator**: Accepts message, adds to history
2. **Crisis Detection**: Checks for severe keywords → "anxious" is not critical
3. **Data Context**:
   - Finds recent journal entry showing anxiety
   - Pulls mood trend: "declining"
   - Gets favorite skills: [Box Breathing, Progressive Muscle Relaxation]
4. **Claude** (with context):
   - Acknowledges anxiety
   - References their history
   - Suggests sleep-friendly approach
5. **Recommendation Engine**:
   - Detects "anxiety" keyword
   - Suggests Box Breathing (favorite)
   - Suggests Progressive Relaxation (good for sleep)
6. **UI Renderer**:
   - Shows Claude's response
   - Shows 2 skill buttons: "Box Breathing" and "Progressive Muscle Relaxation"
   - User can click to start exercise

---

## Data Integration Points

### Journal Handler Integration
```javascript
// What the chat agent can access:
journalHandler.entries[]           // All journal entries
journalHandler.getMoodStats(30)   // 30-day mood data
journalHandler.calculateTrend()   // Mood direction
```

### Coping Handler Integration
```javascript
// What the chat agent can access:
copingHandler.getCopingSkills()   // All 21 exercises
copingHandler.getFavorites()      // User's saved favorites
copingHandler.getByCondition()    // Skills for specific condition
```

### Treatment Handler Integration (Future)
```javascript
// Potential for treatment recommendations:
treatmentHandler.getTreatments()  // 25 treatments database
// Chat could eventually suggest "This sounds like something
// cognitive behavioral therapy could help with..."
```

---

## Crisis Detection Deep Dive

### How Crisis Detection Works

**Real-time Scanning**:
```javascript
detectCrisis(userMessage) {
    const crisisKeywords = [
        'suicide', 'suicidal', 'kill myself', 'end it',
        'hurt myself', 'self harm', 'cutting', 'harm',
        'die', 'death', 'hopeless', 'worthless', ...
    ];

    return crisisKeywords.some(keyword =>
        userMessage.toLowerCase().includes(keyword)
    );
}
```

**Response Protocol**:
1. Message flagged with `isCrisis: true`
2. UI immediately shows crisis alert
3. Claude responds with crisis-aware empathy
4. User sees 988 and 911 prominently
5. State-specific resources available via Crisis tab

**Limitations & Safeguards**:
- Simple keyword matching (not NLP-based)
- May have false positives
- Always encourage professional help
- Emergency resources always accessible
- Never replace actual crisis hotlines

---

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE (chat-ui.js)             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Message Display | Input Field | Suggested Skills  │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────┐
│              ORCHESTRATOR AGENT (chat-handler.js)           │
│  - Routes messages                                          │
│  - Manages history                                          │
│  - Coordinates agents                                       │
└────────────┬────────────────────────────────────────────────┘
             │
        ┌────┴────┬─────────────┬────────────┐
        ↓         ↓             ↓            ↓
    ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
    │Crisis  │ │ Data   │ │Claude  │ │Recommend │
    │Detector│ │Context │ │ AI     │ │  Engine  │
    └────────┘ └────────┘ └────────┘ └──────────┘
        │         │             │            │
        └─────────┴─────────────┴────────────┘
                   │
                   ↓
         ┌──────────────────────┐
         │ Anthropic API        │
         │ (Claude Model)       │
         └──────────────────────┘
```

---

## Configuration & Customization

### Adjusting Agent Behavior

**Crisis Keywords**:
```javascript
// In chat-handler.js constructor
this.crisisKeywords = [
    // Add more keywords here
];
```

**Claude Model Settings**:
```javascript
// In sendMessage() API call
{
    model: 'claude-opus-4-6',
    max_tokens: 500,
    temperature: 0.7  // Lower = more focused, Higher = more creative
}
```

**System Prompt Customization**:
```javascript
// In buildSystemPrompt()
// Modify to change AI personality, instructions, or constraints
```

---

## Performance Considerations

### Agent Load Distribution
- **Orchestrator**: Always active (light load)
- **Crisis Detector**: Runs on every message (very fast)
- **Data Context**: Runs once per message (fast)
- **Claude AI**: Runs once per message (bottleneck - external API)
- **Recommendation Engine**: Runs once per message (fast)
- **UI Renderer**: Runs once per message (light load)

### Optimization Strategies
1. Cache user context data (update only when needed)
2. Debounce API calls if user types quickly
3. Load Claude model in background after 5 messages
4. Store conversation locally to avoid re-fetching

---

## Security & Privacy

### Data Handling
- **Local Storage Only**: Conversations stored in browser
- **No Backend Server**: All processing client-side
- **API Key Management**: User provides their own Anthropic key
- **Optional Storage**: User can disable saving

### Safety Measures
- Crisis detection with immediate escalation
- No medical diagnosis - educational only
- Always encourage professional help
- Transparent about AI limitations

---

## Testing the Agents

### Test Scenarios

**1. Normal Conversation**
```
User: "I'm feeling stressed about exams"
Expected: Empathetic response + study stress coping skills suggested
```

**2. Crisis Detection**
```
User: "I've been thinking about hurting myself"
Expected: Crisis alert + 988 number + empathetic response
```

**3. Context Awareness**
```
(After journal entry showing depression)
User: "Still feeling down?"
Expected: AI references recent journal, acknowledges trend
```

**4. Recommendation**
```
User: "I need to calm down right now"
Expected: Breathing exercise suggested (matching to anxiety)
```

---

## Future Enhancements

1. **Advanced NLP Crisis Detection**: Replace keyword matching with ML model
2. **Treatment Recommendations**: Suggest evidence-based treatments based on conversation
3. **Parent Integration**: Allow parents to see summaries (with consent)
4. **Multi-turn Context**: Remember preferences across multiple conversations
5. **Sentiment Analysis**: Track emotional trajectory through conversation
6. **Peer Support**: Connect to community support groups (with proper moderation)

---

## Troubleshooting

### Chat Not Working?
1. Check API key is set
2. Check browser console for errors
3. Verify Anthropic API key is valid
4. Check network connection

### Suggestions Not Appearing?
1. Verify coping skills are loaded
2. Check if message contains relevant keywords
3. Check browser console for errors

### Crisis Alert Not Showing?
1. Verify keyword is in crisis list
2. Check UI rendering in browser dev tools
3. Ensure crisis handler is initialized

---

## Summary

The AI Companion Chat system demonstrates how multiple specialized agents can work together to provide intelligent, personalized mental health support. By separating concerns (orchestration, crisis detection, data retrieval, AI generation, recommendations, UI rendering), the system is:

✅ **Maintainable** - Each agent has clear responsibility
✅ **Scalable** - Easy to add new agents
✅ **Safe** - Crisis detection runs independently
✅ **Personalized** - Context awareness improves responses
✅ **User-Centric** - Privacy-first, local-only approach

