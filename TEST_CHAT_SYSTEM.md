# AI Chat System - Complete Testing Guide

## Getting an API Key

### Option 1: Get Your Own Free API Key (Recommended)
1. Visit: https://console.anthropic.com
2. Sign up for free (email only, no credit card required for starter credit)
3. Go to "API Keys" section
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-`)

### Option 2: Use the Test Harness (This Document)
This guide includes mock tests that simulate the API without needing a real key.

---

## Testing Instructions

### Step 1: Open the Application
```bash
# Navigate to the project directory
cd /Users/jeevan.patil/Downloads/Project/MentalHealth

# Open in browser (or use local server)
open index.html
# OR
python -m http.server 8000  # Then visit http://localhost:8000
```

### Step 2: Navigate to AI Chat Tab
- Click the "🤖 AI Companion Chat" tab
- You should see the welcome message

### Step 3: Test with Real API Key
When you first click Send:
1. A modal will appear asking for API key
2. Enter your API key from console.anthropic.com
3. Optionally check "Save API key in browser"
4. Click "Save & Continue"

### Step 4: Send Test Messages
Try these in order:

#### **Test 1: Normal Conversation**
```
Message: "I've been feeling anxious about school"
Expected:
  - Response from Claude (empathetic)
  - Suggested coping skills appear
  - No crisis alert
```

#### **Test 2: Personalization Test**
First, add a journal entry:
1. Go to "📔 My Journal" tab
2. Select mood: 5/10 (😊)
3. Condition: "Anxiety"
4. Write: "Worried about presentation tomorrow"
5. Save entry

Then chat:
```
Message: "Still thinking about that presentation"
Expected:
  - Claude references your journal entry
  - Claude mentions your anxiety condition
  - Suggests relevant breathing exercises
```

#### **Test 3: Crisis Detection**
```
Message: "I've been thinking about hurting myself"
Expected:
  - RED ALERT appears immediately
  - Shows "🆘 WE'RE HERE FOR YOU"
  - Displays "Call or Text 988"
  - Shows "Call 911"
  - Claude responds with crisis awareness
```

#### **Test 4: Suggestion Testing**
```
Message: "I can't focus and I'm stressed"
Expected:
  - 2 suggested exercises appear as buttons
  - Exercises relate to focus/stress
  - Can click button to view full exercise
```

#### **Test 5: Multi-turn Conversation**
```
Message 1: "I'm feeling down today"
Expected: Empathetic response

Message 2: "What can I do to feel better?"
Expected: Claude references previous message

Message 3: "I like the breathing exercise"
Expected: Claude remembers your preference
```

---

## Testing Console Output

Open browser Developer Console (F12 or Cmd+Option+I) to verify:

### ✅ Expected Console Messages:
```
✓ chat-handler.js loaded
✓ chat-ui.js loaded
✓ Chat initialized
✓ API key received
✓ Message sent to Claude
✓ Response received
✓ Conversation saved
```

### ❌ Error Messages to Watch For:
```
❌ API key error → Invalid key format
❌ Network error → No internet connection
❌ Parsing error → API response format issue
❌ Storage error → localStorage disabled
```

---

## Testing Without Real API (Mock Testing)

If you don't have an API key yet, you can test the UI flow:

### Test UI Only (No API)
```javascript
// In browser console, run this to bypass API:
chatHandler.apiKey = "sk-ant-test-dummy-key";
localStorage.setItem('anthropic_api_key', 'sk-ant-test-dummy-key');
```

This will:
- ✅ Load chat interface
- ✅ Test message input
- ✅ Test localStorage
- ❌ API calls will fail (expected without real key)

### Verify UI Components:
- [ ] Chat tab appears in navigation
- [ ] Welcome message shows
- [ ] Input field is visible
- [ ] Send button is clickable
- [ ] Message input accepts text

---

## Crisis Detection Testing

### Test Keywords (What Triggers Alert)
These should show RED ALERT:
- "suicide", "suicidal", "kill myself"
- "self harm", "cutting", "hurt myself"
- "hopeless", "worthless"
- "end it", "no reason to live"

### Test Safe Keywords (What Doesn't Trigger)
These should NOT show red alert:
- "feeling down" (normal sadness)
- "worried about tests" (normal stress)
- "tired" (normal fatigue)
- "don't feel like doing anything" (depression, but not immediate crisis)

---

## Data Integration Testing

### Test 1: Journal Integration
```
Prerequisite:
1. Add journal entry with mood 3/10, condition "depression"

Test:
1. Send chat message: "I'm still feeling depressed"
2. Check console: Log userContext
3. Verify: Claude mentions your declining mood
```

### Test 2: Coping Skills Integration
```
Prerequisite:
1. Go to Coping tab
2. Add "Box Breathing" to favorites (click heart)

Test:
1. Send chat message: "I need to calm down"
2. Verify: Suggestions appear as buttons
3. Click "Box Breathing" suggestion
4. Verify: Opens coping exercise modal
```

### Test 3: Mood Trend Testing
```
Prerequisite:
1. Add 3 journal entries over 3 days:
   - Day 1: Mood 7/10
   - Day 2: Mood 6/10
   - Day 3: Mood 5/10

Test:
1. Send chat: "How am I doing?"
2. Check console: Log moodTrend
3. Verify: Claude mentions "declining trend"
```

---

## Performance Testing

### Response Time Benchmarks
- **UI Render**: < 100ms (no API)
- **Message Send**: < 200ms (including validation)
- **API Response**: 1-3 seconds (Claude generation)
- **Suggestion Display**: < 100ms (after API response)
- **Total**: ~2-3 seconds user-perceived latency

### Memory Testing
1. Open DevTools → Memory tab
2. Take heap snapshot
3. Send 10 messages
4. Take another snapshot
5. Verify: No significant leak

### Storage Testing
1. Open DevTools → Application → LocalStorage
2. Look for: `mentalHealthChat` key
3. Verify: Conversation history saves

---

## Browser Compatibility Testing

Test in these browsers:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome)

**Check for:**
- [ ] Chat interface displays correctly
- [ ] Input field accepts typing
- [ ] Suggestions render
- [ ] Crisis alert shows
- [ ] Smooth animations

---

## Security Testing

### ✅ What Should Be Secure:
1. **API Key Handling**
   - Verify: Key only in localStorage (user can clear)
   - Verify: Key NOT in URL parameters
   - Verify: Key NOT in console logs
   - Verify: Key NOT sent to any server except Anthropic

2. **Data Privacy**
   - Verify: Conversations stored locally only
   - Verify: No backend calls (except Claude API)
   - Verify: Journal data never sent with chat

3. **XSS Prevention**
   - Verify: User messages escaped
   - Verify: Claude responses escaped
   - Verify: HTML not injected

### Testing XSS:
```
Send this message:
<script>alert('XSS')</script>

Expected: Shows as text, not executed
Verify: Check HTML - should be escaped
```

---

## API Error Handling Testing

### Test Invalid API Key
```
1. Enter: "sk-ant-invalid-key"
2. Send message
Expected: Error message appears
Verify: No crash, graceful error
```

### Test Network Offline
```
1. Disable internet (or open DevTools → Network → Offline)
2. Send message
Expected: Network error shown
Verify: Can still see chat history (cached)
```

### Test API Rate Limit
```
Send 10 messages rapidly
Expected: Graceful handling
Verify: No UI freeze
```

---

## Full Test Checklist

### Phase 1: UI/UX Testing
- [ ] Chat tab appears
- [ ] Welcome message shows
- [ ] Input field works
- [ ] Send button works
- [ ] Message input scrolls
- [ ] Mobile responsive
- [ ] Dark mode compatible
- [ ] Accessibility (keyboard nav)

### Phase 2: API Integration
- [ ] API key modal appears
- [ ] API key saves to localStorage
- [ ] Messages send to Claude
- [ ] Responses display correctly
- [ ] Streaming works (if implemented)
- [ ] Error handling works
- [ ] Network errors handled

### Phase 3: Crisis Detection
- [ ] Crisis keywords trigger alert
- [ ] Red alert displays prominently
- [ ] 988 number visible
- [ ] 911 number visible
- [ ] Crisis response is empathetic
- [ ] No false positives

### Phase 4: Data Integration
- [ ] Journal data read correctly
- [ ] Mood trends calculated
- [ ] Favorite coping skills retrieved
- [ ] Conditions detected
- [ ] Personalization works

### Phase 5: Suggestions
- [ ] Suggestions appear (when relevant)
- [ ] Max 2 suggestions shown
- [ ] Suggestions are clickable
- [ ] Clicking opens coping exercise
- [ ] Suggestions match topics

### Phase 6: Storage & History
- [ ] Conversation saves to localStorage
- [ ] History persists after refresh
- [ ] Clear button works
- [ ] Export button downloads JSON
- [ ] No data loss

### Phase 7: Cross-browser
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in mobile
- [ ] Responsive design

### Phase 8: Performance
- [ ] Response time < 3 seconds
- [ ] No memory leaks
- [ ] Smooth animations
- [ ] No lag with 50+ messages

---

## Step-by-Step Test Walkthrough

### Test Scenario: New User Flow
```
Time: ~5 minutes

1. [0:00] Open app → Click Chat tab
   Verify: Chat tab visible, welcome message

2. [0:30] Enter first message: "Hi, I'm trying this out"
   Verify: API key modal appears

3. [1:00] Enter API key → Click Save
   Verify: Modal closes, message sending

4. [1:30] Receive response
   Verify: Message displays, no errors

5. [2:00] Send: "I've been anxious lately"
   Verify: Suggestions appear, relevant exercises shown

6. [3:00] Click suggested exercise
   Verify: Opens coping tab with exercise

7. [4:00] Return to chat, send: "That helped"
   Verify: Claude acknowledges feedback

8. [4:30] Click Export button
   Verify: JSON file downloads with conversation

9. [5:00] Click Clear button
   Verify: Confirmation dialog, history clears
```

---

## Debugging Tips

### If Chat Tab Doesn't Appear:
1. Open DevTools (F12)
2. Check console for errors
3. Verify: `chat-handler.js` loaded
4. Verify: `chat-ui.js` loaded
5. Check: HTML has chat pane div

### If Messages Don't Send:
1. Check console for errors
2. Verify API key entered
3. Verify internet connection
4. Check Anthropic API status
5. Verify key format (starts with `sk-ant-`)

### If No Suggestions Appear:
1. Check console: Log suggestedSkills
2. Verify coping skills loaded
3. Check message contains keywords
4. Verify copingHandler initialized

### If Crisis Alert Not Showing:
1. Use exact keyword: "suicide", "self harm"
2. Check console: Log isCrisis
3. Verify detectCrisis() running
4. Check CSS for alert styling

### If Data Not Personalizing:
1. Add journal entry first
2. Verify journalHandler initialized
3. Check console: Log getUserContext()
4. Verify system prompt includes context

---

## Success Metrics

✅ **System Works If:**
- Chat interface loads and displays
- Messages can be sent and received
- API key integration works
- Crisis detection triggers correctly
- Suggestions appear when relevant
- Data from journal/coping integrates
- No crashes or errors
- Responsive on mobile

---

## Next: Production Deployment

Once testing passes:
1. Commit changes with message:
   ```
   "Add AI Companion Chat with 6-agent architecture"
   ```
2. Push to GitHub main branch
3. GitHub Pages auto-deploys
4. Test live version at: https://g1sp.github.io/mental-health-dashboard
5. Share with users

---

## Support Resources

**Getting Help:**
- Anthropic API Docs: https://docs.anthropic.com
- Anthropic Status: https://status.anthropic.com
- GitHub Issues: Report any bugs found

**Monitoring:**
- Check API usage: console.anthropic.com
- Monitor costs: ~$0.003 per message
- Track error rates in browser console

