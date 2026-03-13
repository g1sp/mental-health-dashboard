# Crisis Resources - Testing Checklist

## ✅ Quick Test Guide

The dashboard is now running at **http://localhost:8000**

### Test Each Component

#### 🆘 **Test 1: Crisis Banner**
- [ ] Refresh page - Red banner appears at very top
- [ ] Banner shows: "🆘 Crisis Help Available 24/7"
- [ ] Banner shows: "Call or Text 988"
- [ ] Banner shows: "Emergency: 911" (on desktop)
- [ ] Click X button to dismiss banner
- [ ] Banner disappears
- [ ] Refresh page - Banner reappears
- [ ] Banner has red gradient background
- [ ] Text is white and bold

**What you should see:**
```
🆘 Crisis Help Available 24/7
Call or Text 988 | Emergency: 911 [X]
```

---

#### 📋 **Test 2: Dashboard Card**
- [ ] Go to **Dashboard** tab (or it's the default)
- [ ] Look at top of page (below banner)
- [ ] See card with title: "🆘 Crisis Support Available 24/7"
- [ ] Card shows two crisis resources:
  - [ ] Crisis Lifeline (988) with phone/text options
  - [ ] Emergency (911) with call/ER options
- [ ] Each shows icons: 📞 for call, 💬 for text
- [ ] Card has "View All Resources →" button at bottom
- [ ] Click button - Modal should open

**What you should see:**
```
┌─────────────────────────────────────┐
│ 🆘 Crisis Support Available 24/7    │
│                                     │
│ 📞 Crisis Lifeline (988)            │
│    Call/Text: 988, Chat online      │
│                                     │
│ 🚨 Emergency (911)                  │
│    Call: 911, Go to ER              │
│                                     │
│    [View All Resources →]           │
└─────────────────────────────────────┘
```

---

#### 🔴 **Test 3: Navbar Help Button**
- [ ] Look at top right of navbar
- [ ] See red button: "🆘 Get Help"
- [ ] Button has pulse animation (gently fades in/out)
- [ ] Click button from **any tab**
- [ ] Modal opens with all resources

**What you should see:**
```
Top right corner: [🆘 Get Help]
With pulsing animation effect
```

---

#### 📦 **Test 4: Crisis Modal (Full Resources)**
Open the modal by:
- Option A: Click "View All Resources" on dashboard card
- Option B: Click "🆘 Get Help" button in navbar

Then verify:
- [ ] Modal has red header with title: "🆘 Crisis Resources - 24/7 Support"
- [ ] Modal displays all 4 resources:
  1. [ ] **Crisis Lifeline (988)**
     - [ ] Full description visible
     - [ ] Call 988 listed
     - [ ] Text 741741 listed
     - [ ] Chat link listed
     - [ ] "Best for: Suicidal thoughts, emotional crisis..." shown

  2. [ ] **Emergency Services (911)**
     - [ ] Full description visible
     - [ ] Call 911 listed
     - [ ] Go to ER listed
     - [ ] "Best for: Immediate danger..." shown

  3. [ ] **Care Solace**
     - [ ] Find counselors description shown
     - [ ] caresolace.com link is clickable
     - [ ] SAMHSA Helpline number shown

  4. [ ] **Say Something**
     - [ ] Prevention program description shown
     - [ ] saysomething.net link is clickable
     - [ ] Training info shown

- [ ] Each resource has an icon (🆘, 🚨, 👨‍⚕️, 🤝)
- [ ] Each resource has different color coding
- [ ] Resources are separated with borders
- [ ] Modal has "Close" button at bottom
- [ ] Click Close - Modal disappears

**What you should see:**
```
┌──────────────────────────────────────────┐
│ 🆘 Crisis Resources - 24/7 Support   [X] │
├──────────────────────────────────────────┤
│ 🆘 Crisis Lifeline (988)                 │
│ Free, confidential, 24/7 support...      │
│ Call: 988                                │
│ Text: 741741                             │
│ Chat: 988lifeline.org/chat               │
│ Best for: Suicidal thoughts, emotional   │
│           crisis, depression, anxiety    │
├──────────────────────────────────────────┤
│ 🚨 Emergency Services (911)              │
│ For immediate danger to self or others   │
│ Call: 911                                │
│ Go to: Nearest hospital/emergency room   │
│ Best for: Immediate danger, active...    │
├──────────────────────────────────────────┤
│ 👨‍⚕️ Care Solace                            │
│ Find local counselors and therapists     │
│ Website: caresolace.com                  │
│ Crisis: 1-800-985-5990                   │
│ Best for: Finding long-term therapy...   │
├──────────────────────────────────────────┤
│ 🤝 Say Something                         │
│ Crisis prevention through community...   │
│ Website: saysomething.net                │
│ Train: Learn crisis prevention training  │
│ Best for: Crisis prevention, peer...     │
├──────────────────────────────────────────┤
│ You deserve support. Help is always...   │
├──────────────────────────────────────────┤
│             [Close]                      │
└──────────────────────────────────────────┘
```

---

#### 📱 **Test 5: Mobile Responsiveness**
Use browser dev tools (F12) to test mobile view:

- [ ] Resize browser to mobile width (375px)
- [ ] Banner text shortens appropriately
- [ ] "Emergency: 911" not shown on mobile banner
- [ ] Dashboard card stacks vertically
- [ ] Crisis resources are still readable
- [ ] Buttons are touch-friendly
- [ ] Modal fits on screen
- [ ] All text is readable

---

#### 🔗 **Test 6: Links Work**
In the modal, test external links:
- [ ] Click "caresolace.com" - Opens in new tab
- [ ] Click "saysomething.net" - Opens in new tab
- [ ] Other resources show phone numbers properly
- [ ] Chat link references 988lifeline.org/chat

---

#### 🎨 **Test 7: Styling & Colors**
- [ ] Banner is red (#e74c3c) with gradient
- [ ] Dashboard card has left red border
- [ ] Modal header is red with white text
- [ ] Resources have different accent colors:
  - [ ] Crisis Lifeline: Red (danger)
  - [ ] Emergency: Red (danger)
  - [ ] Care Solace: Blue (info)
  - [ ] Say Something: Green (success)
- [ ] Icons are visible and clear
- [ ] Text contrast is high and readable

---

#### ⌨️ **Test 8: Keyboard Navigation**
- [ ] Tab through page elements
- [ ] All buttons are reachable via Tab
- [ ] Modal can be closed with Escape key
- [ ] Links can be activated with Enter

---

#### 🔄 **Test 9: Other Tabs Still Work**
Make sure crisis integration didn't break other features:
- [ ] **Dashboard tab**: Charts load and work
- [ ] **Treatments tab**: Treatments display and filter correctly
- [ ] **Risk Factors tab**: Risk factors display correctly
- [ ] **Learning tab**: Content displays properly
- [ ] All filters still work

---

#### ⚡ **Test 10: Performance**
- [ ] Page loads quickly
- [ ] Banner appears immediately
- [ ] No console errors (F12 -> Console)
- [ ] Modal opens quickly
- [ ] No lag when switching tabs

---

## 🐛 Troubleshooting

### Issue: Banner doesn't appear
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+R)
- Check browser console for errors

### Issue: Modal doesn't open
**Solution:**
- Check if Bootstrap is loaded (should see bootstrap CSS)
- Check console for JavaScript errors
- Try clicking different buttons (dashboard card vs navbar)

### Issue: Resources don't show in modal
**Solution:**
- Check if `crisis-resources-data.json` loaded
- Look in Network tab (F12) to verify JSON loads
- Check console for errors

### Issue: Styling looks wrong
**Solution:**
- Check if `style.css` loaded properly
- Verify no CSS errors in console
- Try hard refresh (Ctrl+Shift+R)

### Issue: Links in modal don't work
**Solution:**
- Check if links have correct URLs in JSON
- Test links directly in browser
- Check popup blockers aren't preventing new tabs

---

## 📝 Browser Console Test

Press **F12** to open Developer Tools, then go to **Console** tab.

You should see:
```
Crisis resources loaded: 4
```

If you see errors, note them down and check:
1. File paths are correct
2. JSON is valid
3. JavaScript files are loading in correct order

---

## ✅ Sign-Off Checklist

- [ ] Banner appears and is dismissible
- [ ] Dashboard card displays resources
- [ ] "View All Resources" button works
- [ ] "Get Help" navbar button works
- [ ] Modal opens with all 4 resources
- [ ] All links in modal are clickable
- [ ] Modal closes properly
- [ ] Works on mobile
- [ ] Styling looks correct
- [ ] No console errors
- [ ] Other dashboard features still work

---

## 🎉 Success!

If all tests pass, your crisis resources integration is working perfectly! Users now have immediate access to crisis support through:
- Always-visible banner
- Prominent dashboard card
- Quick-access help button

---

## 📸 Screenshots to Note

As you test, pay attention to:
1. The red banner at the very top
2. The dashboard card with emergency numbers
3. The "Get Help" button animation (pulsing)
4. The modal layout and styling
5. Mobile view responsiveness

---

**Server running at: http://localhost:8000**

---

*Last Updated: March 2026*

