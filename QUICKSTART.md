# Quick Start Guide

## 🚀 Get Started in 30 Seconds

### Option 1: Python Web Server (Recommended)
```bash
cd /Users/jeevan.patil/Downloads/Project/MentalHealth
python3 -m http.server 8000
```
Then visit: **http://localhost:8000**

### Option 2: Node.js
```bash
npx http-server
```

### Option 3: VS Code Live Server
- Right-click `index.html` → "Open with Live Server"

---

## 📊 What You'll See

### Dashboard Components
1. **Filter Panel** - Year, State, Age Group, Metric selectors
2. **Trend Chart** - Line graph showing changes over time
3. **Age Group Chart** - Bar chart comparing age demographics
4. **State Chart** - Horizontal bar chart for state comparison
5. **Distribution Chart** - Doughnut chart of metric breakdown
6. **Data Table** - Raw filtered data with automatic averages

### Sample Interactions
- Select "2023" year to see most recent data
- Choose "13-17" age group to focus on high school teens
- Pick "depression" metric to analyze depression trends
- Mix filters to create custom views

---

## 📁 File Structure

```
MentalHealth/
├── index.html           ← Open this in browser
├── js/
│   ├── app.js          ← Main logic
│   ├── data-handler.js ← Data management
│   └── chart-manager.js← Visualizations
├── css/
│   └── style.css       ← Styling
├── data/
│   ├── yrbs-data.json  ← 144 data records
│   └── README.md       ← Data documentation
└── README.md           ← Full documentation
```

---

## 🎯 Key Features

✓ Real-time chart updates
✓ Multi-filter support
✓ Responsive design
✓ No build tools needed
✓ CDC YRBS data format
✓ Educational-friendly

---

## 💡 Tips

- **Filter combinations** update all 4 charts automatically
- **Data table** shows exact values and averages
- **Trends** typically show increased mental health challenges post-pandemic
- **Treatment access** metrics show improvement over time

---

## 📚 Learn More

- Full docs: See `README.md`
- Data info: See `data/README.md`
- CDC YRBS: https://www.cdc.gov/yrbs

Enjoy exploring the data! 🧠
