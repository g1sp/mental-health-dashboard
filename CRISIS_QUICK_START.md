# Crisis Resources - Quick Start Guide

## What's New?

Your Mental Health Dashboard now features integrated crisis resources with **three easy ways** for users to access immediate support:

## 🎯 Three Entry Points

### 1. Red Banner at Top ⬆️
Appears automatically on page load:
```
🆘 Crisis Help Available 24/7
Call or Text 988 | Emergency: 911
```
- **Location**: Top of every page
- **Always Visible**: You can dismiss it, but it stays accessible
- **Mobile**: Shows abbreviated version on small screens

### 2. Dashboard Card 📋
On the Dashboard tab, see crisis resources prominently displayed:
```
🆘 Crisis Support Available 24/7
├─ 📞 Crisis Lifeline (988): Call or Text
└─ 🚨 Emergency (911): Immediate danger
```
- **Location**: Top of Dashboard, above charts
- **Action**: Click "View All Resources" to see more

### 3. Get Help Button 🆘
In the navbar on the right:
```
🆘 Get Help
```
- **Location**: Top right corner
- **Action**: Click anytime to open full resource details
- **Design**: Red button with pulse animation for visibility

## 📚 Crisis Resources Available

| Resource | Best For | Contact |
|----------|----------|---------|
| **988 Lifeline** | Suicidal thoughts, emotional crisis | Call/Text 988 or Chat online |
| **Emergency (911)** | Immediate danger, severe crisis | Call 911 or go to ER |
| **Care Solace** | Finding a counselor or therapist | Visit caresolace.com |
| **Say Something** | Crisis prevention, peer support | Visit saysomething.net |

## 🚀 Testing the Features

### Test the Banner
1. Refresh the page
2. You should see the red banner at the very top
3. Click the X button to dismiss it
4. Refresh the page again - it reappears

### Test the Dashboard Card
1. Go to the Dashboard tab
2. Look at the top of the page
3. You'll see the crisis card with 988 and 911
4. Click "View All Resources" button

### Test the Modal
1. Click the "🆘 Get Help" button in the top right
2. A modal opens with all 4 resources
3. You can see full descriptions and contact methods
4. Click links to visit resource websites
5. Click "Close" to dismiss

## 🔧 Customization

### Updating Resource Information
Edit `data/crisis-resources-data.json`:
```json
{
  "resources": [
    {
      "name": "Crisis Lifeline (988)",
      "description": "24/7 crisis support",
      "methods": [
        {"type": "Call", "value": "988"}
      ]
    }
  ]
}
```

### Changing Banner Text
Edit the HTML in `index.html` around line 10:
```html
<div id="crisisBanner" class="alert alert-danger">
    <strong>🆘 Crisis Help Available 24/7</strong>
    <!-- Edit this text -->
</div>
```

### Styling Changes
Edit `css/style.css` section starting at line ~321:
```css
/* Crisis Resources Banner */
#crisisBanner {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    /* Customize colors, padding, etc */
}
```

## 📱 Mobile Features

On mobile devices:
- Banner text abbreviates to save space
- "Get Help" button is touch-friendly
- Modal is optimized for smaller screens
- All content remains readable
- Dashboard card stacks vertically

## ♿ Accessibility

Crisis resources are designed to be accessible:
- High contrast colors (red on white)
- Large, clear text
- Keyboard navigable buttons and modals
- Screen reader friendly
- Works on all modern browsers

## 🔐 Privacy & Data

- No user data is collected
- Resources are third-party trusted services
- Information is loaded locally from JSON file
- No external tracking on resource links
- Users can dismiss banner for their session

## ⚙️ How It Works (Technical)

1. **Initialization**: When page loads, crisis resources load **first** before any other data
2. **Rendering**: Crisis UI automatically renders banner, card, and modal
3. **User Interaction**: Buttons and dismissals are handled by JavaScript
4. **Data**: All resource information comes from `crisis-resources-data.json`

## 📊 Files Involved

```
New Files:
├── data/crisis-resources-data.json
├── js/crisis-handler.js
├── js/crisis-ui.js
└── CRISIS_RESOURCES_GUIDE.md (detailed documentation)

Modified Files:
├── index.html (added banner, card, modal, button)
├── css/style.css (added crisis styling)
└── js/app.js (loads crisis resources first)
```

## 🐛 Troubleshooting

### Banner not showing?
- Check if it was dismissed (refresh page)
- Check browser console for JavaScript errors
- Verify `crisis-resources-data.json` loads correctly

### "Get Help" button not working?
- Check if Bootstrap modal is loading properly
- Verify `crisis-ui.js` is loaded in HTML
- Check browser console for errors

### Modal not opening?
- Verify Bootstrap 5 is loaded (required for modals)
- Check if JavaScript files are in correct order
- Look for console errors

### Resource links not working?
- Verify URLs in `crisis-resources-data.json`
- Check internet connection
- Test links directly in browser

## 📖 Learn More

For detailed information:
- Read `CRISIS_RESOURCES_GUIDE.md` for complete documentation
- Check `index.html` source for HTML structure
- Review `css/style.css` for styling details
- See `js/crisis-handler.js` and `js/crisis-ui.js` for code

## 💡 Pro Tips

1. **For Developers**: Edit `crisis-resources-data.json` to add more resources
2. **For Managers**: Track which resource links are most used
3. **For Teachers**: Use this as an example of data-driven UI patterns
4. **For Parents**: Show this to teens to ensure they know how to get help

## 🆘 If You or Someone You Know Needs Help

**Right Now**:
- **Call or Text 988** - Crisis Lifeline (24/7)
- **Call 911** - For immediate danger
- **Go to nearest ER** - If you need immediate help

**Finding a Therapist**:
- Visit **caresolace.com** - Counselor matching service
- Call **1-800-985-5990** - SAMHSA National Helpline

**Prevention & Support**:
- Visit **saysomething.net** - Learn crisis signs and prevention

---

**Remember**: Seeking help is a sign of strength. You deserve support. 💙

---

**Last Updated**: March 2026
**Version**: 1.0
