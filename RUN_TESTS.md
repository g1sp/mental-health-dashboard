# AI Chat System - Automated Test Runner

## Quick Start Testing

### Option 1: Run Tests Immediately (No Setup)

```bash
# 1. Navigate to project
cd /Users/jeevan.patil/Downloads/Project/MentalHealth

# 2. Start local server (Python)
python -m http.server 8000

# 3. Open browser
open http://localhost:8000

# 4. Wait for page to load
# 5. Open DevTools (F12 or Cmd+Option+I)
# 6. In Console, run:
testChat()
```

### Expected Output:
```
✅ Chat test suite loaded. Run: testChat()

╔════════════════════════════════════════════════════════════╗
║        AI COMPANION CHAT - SYSTEM TEST SUITE               ║
╚════════════════════════════════════════════════════════════╝

[CHAT-TEST] === TEST 1: Handler Initialization ===
[CHAT-TEST] ✅ PASS: chatHandler exists
[CHAT-TEST] ✅ PASS: chatHandler is ChatHandler instance
[CHAT-TEST] ✅ PASS: Crisis keywords defined
[CHAT-TEST] ✅ PASS: Crisis keywords not empty
...
[CHAT-TEST] === TEST 15: Handler Integration ===
[CHAT-TEST] ✅ PASS: journalHandler exists
[CHAT-TEST] ✅ PASS: copingHandler exists
...

╔════════════════════════════════════════════════════════════╗
║        TEST RESULTS: 15 PASSED, 0 FAILED                   ║
╚════════════════════════════════════════════════════════════╝

✅ ALL TESTS PASSED! System is ready for deployment.
```

---

## Test Suite Details

### 15 Automated Tests:

| # | Test | Purpose | Status |
|---|------|---------|--------|
| 1 | Handler Initialization | Chat handler loads correctly | ✅ |
| 2 | UI Initialization | Chat UI components exist | ✅ |
| 3 | Message Storage | Messages save to localStorage | ✅ |
| 4 | Crisis Detection | Crisis keywords detected | ✅ |
| 5 | Data Context | User context gathered | ✅ |
| 6 | System Prompt | Prompt builds correctly | ✅ |
| 7 | Recommendations | Suggestions generated | ✅ |
| 8 | Summary | Conversation summary works | ✅ |
| 9 | UI Rendering | Messages render on screen | ✅ |
| 10 | Event Listeners | Buttons have handlers | ✅ |
| 11 | LocalStorage | Browser storage works | ✅ |
| 12 | HTML Structure | All DOM elements present | ✅ |
| 13 | API Key Handling | API key storage works | ✅ |
| 14 | Export | Conversation exports to JSON | ✅ |
| 15 | Integration | Works with journal/coping | ✅ |

---

## Getting More Details

After running `testChat()`, you can inspect individual results:

```javascript
// Get detailed results
console.table(chatTester.results);

// Get pass/fail counts
console.log(`Passed: ${chatTester.passCount}`);
console.log(`Failed: ${chatTester.failCount}`);

// Get full export
console.log(chatTester.results);
```

---

## Testing with Real API

Once tests pass, you can test with a real API key:

### 1. Get API Key
```
Visit: https://console.anthropic.com
- Sign up (free)
- Generate API key
- Copy key (starts with sk-ant-)
```

### 2. Set API Key in Browser
```javascript
// Option A: Via Chat Modal
// Click Send button → Enter API key when prompted

// Option B: Via Console
chatHandler.apiKey = "sk-ant-YOUR-KEY-HERE";
localStorage.setItem('anthropic_api_key', "sk-ant-YOUR-KEY-HERE");
```

### 3. Test with Messages
```javascript
// In Console, send a test message programmatically:
await chatHandler.sendMessage("Hi, I'm testing the AI chat system");

// Watch the response in the chat interface
```

---

## Individual Test Details

### Test 1: Handler Initialization
**What it tests**: ChatHandler class loads and initializes
**Files involved**: `js/chat-handler.js`
**Passes if**:
- ✅ chatHandler instance exists
- ✅ ChatHandler class defined
- ✅ Crisis keywords array populated
- ✅ Crisis keywords not empty

---

### Test 2: UI Initialization
**What it tests**: Chat UI loads and finds DOM elements
**Files involved**: `js/chat-ui.js`, `index.html`
**Passes if**:
- ✅ chatUI instance exists
- ✅ Chat messages container found
- ✅ Chat input field found
- ✅ Send button found

---

### Test 3: Message Storage
**What it tests**: Messages save and persist correctly
**Files involved**: `js/chat-handler.js`
**Passes if**:
- ✅ New message created with ID
- ✅ Message role correct (user/assistant)
- ✅ Message content stored
- ✅ Message persists in history
- ✅ Timestamp attached

---

### Test 4: Crisis Detection
**What it tests**: Crisis keywords trigger alerts
**Files involved**: `js/chat-handler.js`
**Passes if**:
- ✅ Normal messages NOT flagged
- ✅ "suicide" → crisis detected
- ✅ "self harm" → crisis detected
- ✅ "hopeless" → crisis detected
- ✅ "kill myself" → crisis detected

---

### Test 5: Data Context
**What it tests**: User profile data gathered correctly
**Files involved**: `js/chat-handler.js`, journal/coping handlers
**Passes if**:
- ✅ Context object created
- ✅ recentMood property exists
- ✅ moodTrend property exists
- ✅ Conditions array exists
- ✅ Favorites array exists

---

### Test 6: System Prompt
**What it tests**: System prompt generates with context
**Files involved**: `js/chat-handler.js`
**Passes if**:
- ✅ Prompt generated (non-empty)
- ✅ Includes "compassionate"
- ✅ Identifies as "AI companion"
- ✅ Includes "CURRENT USER CONTEXT"

---

### Test 7: Recommendations
**What it tests**: Suggestion engine finds relevant skills
**Files involved**: `js/chat-handler.js`
**Passes if**:
- ✅ Returns array
- ✅ Max 2 suggestions
- ✅ Handles no-match gracefully

---

### Test 8: Conversation Summary
**What it tests**: Summary generates from messages
**Files involved**: `js/chat-handler.js`
**Passes if**:
- ✅ Summary object created
- ✅ Message count accurate
- ✅ Topics array populated
- ✅ Topics relevant to messages

---

### Test 9: UI Rendering
**What it tests**: Messages render to screen
**Files involved**: `js/chat-ui.js`, `index.html`
**Passes if**:
- ✅ Messages container exists
- ✅ Content rendered (welcome or messages)
- ✅ DOM updated after renderConversation()

---

### Test 10: Event Listeners
**What it tests**: Button clicks have handlers
**Files involved**: `js/chat-ui.js`, `js/app.js`
**Passes if**:
- ✅ Send button has listener
- ✅ Input field has listener
- ✅ Export button exists
- ✅ Clear button exists

---

### Test 11: LocalStorage
**What it tests**: Browser storage works
**Files involved**: `js/chat-handler.js`
**Passes if**:
- ✅ Can write to localStorage
- ✅ Can read from localStorage
- ✅ Can remove from localStorage
- ✅ No storage quota exceeded

---

### Test 12: HTML Structure
**What it tests**: All required DOM elements present
**Files involved**: `index.html`
**Passes if**:
- ✅ Chat tab button exists
- ✅ Chat content pane exists
- ✅ Messages display exists
- ✅ Input field exists
- ✅ Send button exists
- ✅ API key modal exists

---

### Test 13: API Key Handling
**What it tests**: API key can be set and stored
**Files involved**: `js/chat-handler.js`
**Passes if**:
- ✅ API key can be cleared
- ✅ API key can be set
- ✅ API key saves to localStorage
- ✅ API key retrieves from localStorage

---

### Test 14: Export Functionality
**What it tests**: Conversations export to JSON
**Files involved**: `js/chat-handler.js`
**Passes if**:
- ✅ Export returns non-null value
- ✅ Export is string format
- ✅ Export contains messages
- ✅ Export is valid JSON

---

### Test 15: Integration
**What it tests**: Works with other dashboard systems
**Files involved**: `js/journal-handler.js`, `js/coping-handler.js`
**Passes if**:
- ✅ journalHandler accessible
- ✅ copingHandler accessible
- ✅ Can read journal entries
- ✅ Can read coping skills

---

## Troubleshooting Tests

### Test Fails: "chatHandler exists"
**Cause**: `js/chat-handler.js` not loaded
**Fix**:
1. Check browser console for errors
2. Verify file exists: `ls js/chat-handler.js`
3. Check HTML includes script tag
4. Try refreshing page (Cmd+Shift+R)

### Test Fails: "Crisis detection"
**Cause**: Crisis keywords not in list
**Fix**: Check that `this.crisisKeywords` array is populated

### Test Fails: "Data context"
**Cause**: journalHandler not initialized
**Fix**: Make sure journal handler loads first

### Test Fails: "LocalStorage"
**Cause**: Browser has storage disabled or private mode
**Fix**:
1. Not a real issue on standard browsers
2. Try non-private/incognito window
3. Check browser storage settings

### All Tests Fail
**Cause**: Page not fully loaded
**Fix**:
1. Wait for "App loaded" message
2. Check Network tab in DevTools
3. Verify all JS files loaded
4. Try refreshing page

---

## Running Tests Manually

If you want to test specific features:

```javascript
// Test message creation
const msg = chatHandler.addMessage('user', 'Test');
console.log(msg);

// Test crisis detection
console.log(chatHandler.detectCrisis('suicide')); // true
console.log(chatHandler.detectCrisis('hello')); // false

// Test data context
console.log(chatHandler.getUserContext());

// Test system prompt
console.log(chatHandler.buildSystemPrompt());

// Test suggestions
console.log(chatHandler.getRelevantCopingSkills('anxiety'));

// Test export
console.log(chatHandler.exportConversation());

// Test summary
console.log(chatHandler.getConversationSummary());
```

---

## Performance Baseline

Tests should complete in < 1 second:

```
Sample Output:
[CHAT-TEST] Test execution time: 847ms
[CHAT-TEST] Average per-test: 56ms
[CHAT-TEST] Status: PASSED
```

---

## Next Steps After Testing

### ✅ If All Tests Pass:
1. Deploy to GitHub Pages
2. Test with real API key
3. Share with users
4. Monitor usage

### ⚠️ If Tests Fail:
1. Check error messages
2. Debug individual feature
3. Check browser console
4. Review file paths
5. Ensure all files loaded

---

## One-Command Test

Copy and paste into browser console:

```javascript
testChat()
```

That's it! ✅

---

## Test Report Template

To share test results:

```
AI Chat System - Test Report
Date: [TODAY]
Browser: [Chrome/Firefox/Safari]
OS: [Windows/Mac/Linux]

Tests Passed: 15/15
Tests Failed: 0/15
Success Rate: 100%

Notable Results:
- Crisis detection working
- Data integration successful
- localStorage functional
- All DOM elements present

API Testing: [Ready/Pending/Not Tested]
Real API Status: [Pass/Fail/Not Tested]

Notes:
[Any observations]
```

---

## Questions?

- **Tests not running?** → Check browser console for errors
- **Some tests failing?** → Review the "Troubleshooting" section
- **Need more details?** → Run `console.table(chatTester.results)`
- **Want to debug?** → Add `console.log()` statements in test methods

