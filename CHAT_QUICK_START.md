# AI Companion Chat - Quick Start Guide

## 🚀 Getting Started

### 1. Get Your API Key
- Visit: https://console.anthropic.com
- Create a free account
- Generate an API key (starts with `sk-ant-`)

### 2. Enable the Chat
- Click "🤖 AI Companion Chat" tab
- When prompted, enter your API key
- Choose to save it (optional) or enter it each time

### 3. Start Chatting!
- Type your message
- Press Enter or click Send
- Get empathetic responses + helpful suggestions

---

## 💭 What to Talk About

The AI companion can help with:
- ✅ General feelings and emotions
- ✅ Anxiety, stress, or worry
- ✅ Depression or sadness
- ✅ Managing self-harm urges
- ✅ Relationships and social concerns
- ✅ School and performance pressure
- ✅ Finding coping strategies

---

## 🎯 How It Works

1. **You Write**: Share what's on your mind
2. **AI Listens**: Reads your message with context from your journal
3. **AI Responds**: Gives supportive, non-judgmental advice
4. **Suggestions**: Shows relevant coping exercises you can try right now
5. **Click to Try**: Start any suggested exercise in the Coping tab

---

## 🔍 The 6 Agents Behind the Scenes

When you send a message, 6 agents work together:

| Agent | Job | What It Does |
|-------|-----|--------------|
| **Orchestrator** | Central Hub | Manages message flow & history |
| **Claude AI** | Conversationalist | Generates empathetic responses |
| **Data Context** | Memory | Pulls your journal & mood data |
| **Crisis Detector** | Safety | Watches for danger signals |
| **Recommendation Engine** | Helper | Suggests relevant coping skills |
| **UI Renderer** | Display | Shows everything on screen |

### Agent Workflow
```
Your Message
    ↓
Orchestrator catches it
    ↓
Crisis Detector scans for keywords (safety check)
    ↓
Data Context gathers your mood history
    ↓
Claude AI generates response (using all context)
    ↓
Recommendation Engine finds matching skills
    ↓
UI Renderer displays response + suggestions
    ↓
You see message with suggested exercises
```

---

## 🚨 Crisis Detection

The AI watches for keywords related to danger:
- Suicidal thoughts
- Self-harm urges
- Severe distress

**If detected**:
- Red alert appears immediately
- Shows 988 (Suicide & Crisis Lifeline)
- Shows 911 for emergencies
- Encourages professional help

---

## 💡 Suggested Skills

When relevant, the AI suggests coping exercises:

**Example**:
```
You: "I can't stop worrying about my presentation"

AI: "That's a lot of pressure. Let's bring the worry level down
    so you can focus. Try one of these..."

[Button: Box Breathing]  [Button: Grounding Technique]

← Click either to start the exercise right now!
```

---

## 📝 How It Personalizes to You

The AI learns from:
- ✅ Your journal entries
- ✅ Your current mood (1-10)
- ✅ What conditions you're dealing with
- ✅ Your favorite coping exercises
- ✅ Your mood trends over time

**Example**:
```
You've journaled about anxiety 5 times
You love "Box Breathing" (used it 12 times)
Your mood trended: improving

AI: "I see you've been working through anxiety,
    and you've found box breathing really helpful.
    Want to try that now?"
```

---

## 🔒 Privacy & Security

✅ **Everything stays on your device**
- Conversations stored locally in browser
- No data sent to servers (except to Claude API)
- No account needed
- You provide your own API key
- Clear it anytime: 🗑️ button

**Saving Preferences**:
- API key: Optional to save (clear anytime)
- Chat history: Saved locally, can export or delete

---

## 📥 Export & Backup

### Export Your Chat
- Click 📥 button at top
- Downloads as JSON file
- Can share with therapist (if helpful)
- Shows dates, messages, metadata

### Clear Your Chat
- Click 🗑️ button at top
- Confirmation popup (can't undo!)
- Starts fresh conversation

---

## ⚙️ Advanced: Agent Details

### Orchestrator Agent
- **File**: `js/chat-handler.js`
- **Task**: Routes all messages, manages history
- **Key Method**: `sendMessage(userMessage)`

### Claude AI Agent
- **Provider**: Anthropic API
- **Model**: claude-opus-4-6
- **Cost**: ~$0.003 per message (very cheap!)

### Crisis Detector Agent
- **Keywords Monitored**: 20+ crisis phrases
- **Response**: Immediate escalation to 988/911
- **False Positives**: Possible (always encourage real help)

### Data Context Agent
- **Sources**: Journal entries, mood data, coping stats
- **Updates**: Real-time from your data
- **Privacy**: Never sent to Claude unless relevant

### Recommendation Engine
- **Algorithm**: Keyword matching + user preferences
- **Source**: Your 21 coping exercises
- **Logic**: Find top 2 exercises matching your message

### UI Renderer Agent
- **File**: `js/chat-ui.js`
- **Tools**: HTML, CSS, Bootstrap
- **Features**: Smooth animations, responsive design

---

## 🐛 Troubleshooting

### "Chat not working"
→ Check API key is correct
→ Make sure you have internet connection
→ Check browser console (F12) for errors

### "No suggestions appearing"
→ Your message might not match any skills
→ Try mentioning a condition: "I'm anxious"
→ Try mentioning a symptom: "I can't focus"

### "Want to clear API key?"
→ Click 🗑️ button → triggers 988 resources
→ Re-enter when prompted next time

---

## 🎓 How to Use Most Effectively

### Best Practices
1. **Be specific**: "I'm worried about a test" > "I'm worried"
2. **Share context**: Mention what triggered your feeling
3. **Try suggestions**: Click exercise buttons to practice
4. **Track patterns**: Notice what helps in your journal
5. **Be honest**: The AI is non-judgmental

### What NOT to Do
- ❌ Don't rely on AI instead of human support
- ❌ Don't treat it as medical diagnosis
- ❌ Don't ignore crisis signals
- ❌ Don't share extremely private info online (security!)
- ❌ Don't expect 100% accuracy

---

## 📊 Agent Data Flow Diagram

```
┌─ Your Message
│
├─→ Orchestrator (receives & stores)
│
├─→ Crisis Detector (scans for danger)
│   └─ If crisis found: Show alert immediately!
│
├─→ Data Context Agent
│   ├─ Gets last 3 journal entries
│   ├─ Calculates mood trend
│   └─ Retrieves favorite coping skills
│
├─→ Claude AI Agent (in the cloud)
│   ├─ Receives your message
│   ├─ Receives system instructions
│   ├─ Receives user context
│   └─ Generates response
│
├─→ Recommendation Engine
│   ├─ Analyzes your message
│   ├─ Finds matching exercises
│   └─ Ranks by effectiveness
│
├─→ UI Renderer
│   ├─ Displays AI response
│   ├─ Shows suggested skills
│   ├─ Shows crisis alert (if triggered)
│   └─ Scrolls to newest message
│
└─→ You see it on screen!
```

---

## 🔊 What the AI Won't Do

- ⚠️ Diagnose mental health conditions
- ⚠️ Prescribe medication
- ⚠️ Replace a therapist or psychiatrist
- ⚠️ Make decisions for you
- ⚠️ Judge or criticize you
- ⚠️ Remember you across conversations (each chat starts fresh)

---

## 💬 Example Conversations

### Example 1: Normal Conversation
```
You: "I've been anxious about school lately"

AI: "School stress is really common. It sounds like you're
    carrying a lot right now. What part of school worries
    you most—is it grades, social pressure, or something else?"

(Suggestions: Box Breathing, Progressive Relaxation)

You: "Mostly grades. I feel like I have to be perfect"

AI: "That perfectionism can be exhausting. The good news?
    You don't have to be perfect to be worthy. Let's work
    on being 'good enough' instead. Want to try a quick
    exercise to ease the pressure?"
```

### Example 2: Crisis Response
```
You: "I've been thinking about ending it all"

AI: [Crisis Alert appears immediately]

🚨 WE'RE HERE FOR YOU
📞 Call or Text 988 - Suicide & Crisis Lifeline
📞 Call 911 - If in immediate danger

AI: "I'm really glad you told me. These feelings are real,
    and you deserve support from someone trained to help.
    Please reach out to 988 right now. They're available
    24/7 and trained for exactly this."
```

---

## 🤝 When to Use This Chat

**Good Times**:
- Want to process feelings
- Need quick coping strategies
- Want to practice exercises with guidance
- Processing your mood trends
- Sorting through what's bothering you

**Not Good Times**:
- In active crisis (call 988)
- Having severe suicidal thoughts (call 911)
- Need immediate medical help
- Need medication advice
- Want diagnosis for a condition

---

## 📞 Always Remember

**In Crisis?**
- **Call or Text 988** (Suicide & Crisis Lifeline)
- **Call 911** (Immediate danger)
- **Go to nearest ER** (If in hospital)
- **Tell a trusted adult** (Teacher, parent, counselor)

**This chat is a tool, not a replacement for real help.**

---

## 🎯 Next Steps

1. ✅ Get your API key
2. ✅ Enter it in the chat
3. ✅ Send your first message
4. ✅ Try a suggested exercise
5. ✅ Notice how it personalizes to you
6. ✅ Come back when you need support!

**You're not alone. Support is available. 💙**
