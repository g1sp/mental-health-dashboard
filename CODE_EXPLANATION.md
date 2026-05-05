# Mental Health Dashboard - Complete Code Explanation

## Project Overview

This is a **comprehensive mental health education and support web application** for youth, built with vanilla JavaScript, HTML5, and CSS3. It visualizes CDC YRBS (Youth Risk Behavior Survey) data and provides evidence-based information on mental health treatments, coping strategies, and crisis resources.

**Key Purpose:** Educational tool for youth mental health awareness, self-assessment, and access to professional resources.

---

## Architecture & How It Works

### High-Level Flow

```
User Opens index.html
    ↓
DOM Content Loaded → MentalHealthApp.init()
    ↓
Load Crisis Resources (critical first)
    ↓
Load YRBS Data, Treatments, Risk Factors, Coping Skills, Treatments, Journal Prompts, Parent Guidance
    ↓
Initialize All UI Modules
    ↓
Populate Dropdown Filters
    ↓
Render Charts & Data
    ↓
Wait for User Interactions (filter changes, tab switches, input submission)
```

---

## Project Structure

```
MentalHealth/
├── index.html                 # Main HTML page with 9 tabs and UI structure
├── js/                        # JavaScript modules
│   ├── app.js                # Main app orchestration and initialization
│   ├── data-handler.js       # YRBS data loading and filtering
│   ├── chart-manager.js      # Chart.js visualization management
│   ├── treatment-handler.js  # Treatment data & filtering
│   ├── treatment-ui.js       # Treatment card rendering
│   ├── risk-factors-handler.js # Risk factors data
│   ├── risk-factors-ui.js    # Risk factors UI rendering
│   ├── coping-handler.js     # Coping strategies data
│   ├── coping-ui.js          # Coping UI rendering
│   ├── journal-handler.js    # Journal entry storage (localStorage)
│   ├── journal-ui.js         # Journal UI rendering
│   ├── crisis-handler.js     # Crisis resources data
│   ├── crisis-ui.js          # Crisis resources UI
│   ├── chat-handler.js       # AI chat integration (Claude API)
│   ├── chat-ui.js            # Chat interface
│   ├── parent-handler.js     # Parent/caregiver guidance
│   └── parent-ui.js          # Parent UI rendering
├── css/
│   └── style.css             # Custom styling & responsiveness
└── data/
    ├── yrbs-data.json        # CDC youth mental health statistics
    ├── treatments-data.json  # 15 evidence-based treatments
    ├── risk-factors-data.json # Mental health risk factors
    ├── coping-data.json      # Coping strategies & exercises
    ├── crisis-resources.json # Crisis helplines & resources
    └── parent-guidance.json  # Guidance for parents/caregivers
```

---

## Core Modules Explained

### 1. **app.js** - Main Application Controller

**Purpose:** Orchestrates all module initialization and handles inter-module communication.

**Key Components:**

```javascript
class MentalHealthApp {
    // Stores current filter state
    currentFilters = {
        year: '',
        state: '',
        age_group: '',
        metric: ''
    };

    // Main initialization sequence
    async init() {
        // 1. Load crisis resources first (safety priority)
        await crisisHandler.loadCrisisResources();
        await crisisHandler.loadStateResources();
        crisisUI.init();

        // 2. Load educational data
        await dataHandler.loadData();         // YRBS statistics
        await treatmentHandler.loadTreatments(); // Evidence-based treatments
        await riskFactorsHandler.loadRiskFactors();
        await copingHandler.loadCopingSkills();

        // 3. Initialize all UI modules
        copingUI.init();
        journalUI.init();
        parentUI.init();
        chatHandler.init();
        chatUI.init();

        // 4. Populate filter dropdowns
        this.populateDropdowns();
        this.populateTreatmentFilters();

        // 5. Render initial data
        this.updateAllCharts();
    }
}
```

**Key Methods:**

- `populateDropdowns()` - Dynamically creates filter options from data
- `onFilterChange()` - Triggered when user changes filters
- `updateAllCharts()` - Re-renders all visualizations with current filters
- `setupEventListeners()` - Attaches click/change handlers to UI elements

---

### 2. **data-handler.js** - Data Management Layer

**Purpose:** Handles loading, filtering, and aggregating CDC YRBS mental health data.

**Data Structure Example:**
```json
{
  "data": [
    {
      "year": 2023,
      "state": "California",
      "age_group": "13-17",
      "metric": "depression",
      "value": 32.5
    },
    ...
  ]
}
```

**Key Methods:**

```javascript
class DataHandler {
    // Load YRBS data from JSON file
    async loadData() {
        const response = await fetch('data/yrbs-data.json');
        this.data = response.json().data;
    }

    // Get unique values for dropdowns (years, states, age groups)
    getUniqueValues(field) {
        return [...new Set(this.data.map(item => item[field]))];
    }

    // Filter data based on user selections
    filterData(criteria) {
        return this.data.filter(item => {
            if (criteria.year && item.year !== criteria.year) return false;
            if (criteria.state && item.state !== criteria.state) return false;
            if (criteria.age_group && item.age_group !== criteria.age_group) return false;
            if (criteria.metric && item.metric !== criteria.metric) return false;
            return true;
        });
    }

    // Aggregate data for visualizations
    getAggregatedByYear(criteria) {
        // Groups data by year, calculates averages
    }

    getByAgeGroup(criteria) {
        // Groups data by age group for comparison charts
    }

    getByState(criteria) {
        // Groups data by state for geographic analysis
    }
}
```

**Data Flow:**
1. User selects filters from dropdowns
2. `onFilterChange()` triggered
3. `dataHandler.filterData()` filters the dataset
4. `chartManager.updateCharts()` receives filtered data
5. Charts re-render with new data

---

### 3. **chart-manager.js** - Visualization Engine

**Purpose:** Creates and manages Chart.js visualizations for mental health trends.

**Supported Chart Types:**

```javascript
class ChartManager {
    charts = {
        trend: null,      // Line chart - trends over time
        ageGroup: null,   // Bar chart - age group comparison
        state: null,      // Bar chart - state comparison
        distribution: null // Doughnut chart - metric distribution
    };

    // 1. Trend Chart (Line Chart)
    createTrendChart(data) {
        // Shows how mental health metrics change from 2019 → 2021 → 2023
        // Example: Depression prevalence increasing over time
    }

    // 2. Age Group Chart (Bar Chart)
    createAgeGroupChart(data) {
        // Compares metrics across age groups: 9-12, 13-17, 18-25
        // Typically shows older youth have higher mental health challenges
    }

    // 3. State Chart (Bar Chart)
    createStateChart(data) {
        // Geographic comparison: CA, TX, NY, FL
        // Shows state-level variations in mental health
    }

    // 4. Distribution Chart (Doughnut)
    createDistributionChart(data) {
        // Shows proportional breakdown of all metrics
        // Example: 25% depression, 30% anxiety, 20% self-harm, 25% treatment access
    }

    // Central update method
    updateCharts(filters) {
        const trendData = dataHandler.getTrendData(filters);
        const ageGroupData = dataHandler.getByAgeGroup(filters);
        const stateData = dataHandler.getByState(filters);
        const metricData = dataHandler.getByMetric(filters);

        this.createTrendChart(trendData);
        this.createAgeGroupChart(ageGroupData);
        this.createStateChart(stateData);
        this.createDistributionChart(metricData);
    }
}
```

**Example: How Filtering Works**

User selects: State = California, Metric = Depression, Year = 2023

→ `dataHandler.filterData()` returns only CA depression 2023 records

→ `chartManager.updateCharts()` receives filtered data

→ Charts update showing only CA depression trends

---

### 4. **treatment-handler.js & treatment-ui.js** - Evidence-Based Treatments

**Purpose:** Display 15 evidence-based mental health treatments for youth.

**Treatment Data Structure:**
```json
{
  "id": 1,
  "name": "Cognitive Behavioral Therapy (CBT)",
  "category": "Psychotherapy",
  "conditions": ["depression", "anxiety", "self-harm"],
  "age_groups": ["13-17", "18-25"],
  "effectiveness": "Highly Effective",
  "description": "...",
  "resources": ["SAMHSA", "NIMH"],
  "research_data": "..."
}
```

**Key Methods:**

```javascript
class TreatmentHandler {
    async loadTreatments() {
        const response = await fetch('data/treatments-data.json');
        this.treatments = response.json();
    }

    filterTreatments(filters) {
        return this.treatments.filter(treatment => {
            if (filters.condition && !treatment.conditions.includes(filters.condition)) return false;
            if (filters.category && treatment.category !== filters.category) return false;
            if (filters.ageGroup && !treatment.age_groups.includes(filters.ageGroup)) return false;
            return true;
        });
    }

    getCategories() {
        return [...new Set(this.treatments.map(t => t.category))];
    }
}

class TreatmentUI {
    updateTreatmentCards(treatments) {
        // Renders treatment as Bootstrap cards with:
        // - Treatment name and description
        // - Effectiveness rating
        // - Applicable age groups
        // - Link to trusted resources (SAMHSA, NIMH, CDC)
    }
}
```

**User Interaction Flow:**
1. User clicks "Evidence-Based Treatments" tab
2. Selects condition (Depression, Anxiety, Self-Harm)
3. Selects category (Psychotherapy, Medication, etc.)
4. Selects age group
5. `treatmentHandler.filterTreatments()` returns matching treatments
6. `treatmentUI.updateTreatmentCards()` renders them as clickable cards

---

### 5. **journal-handler.js & journal-ui.js** - Mood Tracking

**Purpose:** Allow youth to journalize and track mood/emotions with prompts.

**Data Stored in localStorage:**
```javascript
{
    "entries": [
        {
            "date": "2026-04-15",
            "mood": "anxious",
            "intensity": 7,
            "note": "Feeling overwhelmed with school...",
            "strategies_used": ["breathing", "journaling"]
        }
    ]
}
```

**Key Methods:**

```javascript
class JournalHandler {
    loadEntries() {
        // Load journal entries from browser localStorage
        const saved = localStorage.getItem('journal_entries');
        this.entries = saved ? JSON.parse(saved) : [];
    }

    addEntry(entry) {
        this.entries.push({
            date: new Date().toISOString().split('T')[0],
            mood: entry.mood,
            intensity: entry.intensity,
            note: entry.note,
            strategies_used: entry.strategies
        });
        localStorage.setItem('journal_entries', JSON.stringify(this.entries));
    }

    getEntries(dateRange = null) {
        // Return filtered entries for visualization
    }
}

class JournalUI {
    renderMoodTrend() {
        // Shows mood changes over time (micro-chart)
    }

    displayEntries() {
        // Shows past entries with dates and moods
    }
}
```

---

### 6. **coping-handler.js & coping-ui.js** - Coping Strategies

**Purpose:** Provide practical coping exercises (breathing, mindfulness, etc.).

**Coping Data Structure:**
```json
{
    "id": 1,
    "name": "4-7-8 Breathing Exercise",
    "category": "Breathing Techniques",
    "conditions": ["anxiety", "panic"],
    "duration": "5 minutes",
    "steps": [
        "Breathe in for 4 counts",
        "Hold for 7 counts",
        "Exhale for 8 counts",
        "Repeat 4 times"
    ],
    "effectiveness": "Reduces anxiety and promotes calm"
}
```

**Key Methods:**

```javascript
class CopingUI {
    renderCopingCard(coping) {
        // Creates interactive card with:
        // - Step-by-step instructions
        // - Timer for exercises
        // - Applicable conditions
        // - User can mark as tried/helpful
    }

    startExerciseTimer(duration) {
        // Interactive timer that guides user through exercise
    }
}
```

---

### 7. **crisis-handler.js & crisis-ui.js** - Crisis Resources

**Purpose:** Provide immediate access to crisis helplines and resources.

**Key Data:**
```json
{
    "national": {
        "988_lifeline": {
            "name": "988 Suicide & Crisis Lifeline",
            "number": "988",
            "available": "24/7",
            "description": "Free, confidential crisis support"
        }
    },
    "by_state": {
        "california": {
            "crisis_lines": [...],
            "hospitals": [...],
            "support_groups": [...]
        }
    }
}
```

**Key Methods:**

```javascript
class CrisisHandler {
    loadCrisisResources() {
        // Load national crisis data
    }

    loadStateResources() {
        // Load state-specific resources
    }
}

class CrisisUI {
    init() {
        // Display crisis banner at top with 988 number
    }

    updateByState(state) {
        // When user selects a state, show state-specific crisis resources
    }
}
```

---

### 8. **chat-handler.js & chat-ui.js** - AI Companion Chat

**Purpose:** Provide supportive AI chat using Claude API (Anthropic).

**Architecture:**

```javascript
class ChatHandler {
    async init() {
        // Check if API key exists in localStorage
        this.apiKey = localStorage.getItem('anthropic_api_key');
    }

    async sendMessage(userMessage) {
        if (!this.apiKey) {
            // Show modal to enter API key
            showApiKeyModal();
            return;
        }

        // Call Anthropic Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': this.apiKey,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1024,
                system: `You are a supportive mental health companion...`,
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        const data = await response.json();
        return data.content[0].text;
    }
}

class ChatUI {
    async handleSendMessage() {
        const message = document.getElementById('chatInput').value;
        this.displayMessage(message, 'user');

        const response = await chatHandler.sendMessage(message);
        this.displayMessage(response, 'assistant');
    }

    exportChat() {
        // Download chat transcript as text file
    }
}
```

**Chat Flow:**
1. User types message in chat box
2. Click send or press Enter
3. If no API key: show modal to enter key
4. Send message to Claude API
5. Display response in chat
6. User can export or clear chat

---

### 9. **parent-handler.js & parent-ui.js** - Parental Guidance

**Purpose:** Provide parents/caregivers with guidance on supporting youth mental health.

**Key Data:**
```json
{
    "topics": [
        {
            "title": "Recognizing Warning Signs",
            "content": "...",
            "age_relevant": ["all"],
            "resources": [...]
        }
    ]
}
```

---

### 10. **risk-factors-handler.js & risk-factors-ui.js** - Risk Factors

**Purpose:** Educate about factors that increase mental health risks.

**Risk Factor Categories:**
- Biological/Genetic
- Environmental
- Social
- Behavioral
- Traumatic

---

## User Interface Structure (index.html)

### 9 Main Tabs:

1. **📊 Dashboard** - YRBS data visualizations & filters
2. **⚠️ Risk Factors & Causes** - Educational risk factor content
3. **💊 Evidence-Based Treatments** - 15 proven treatments
4. **🧘 Coping Skills & Exercises** - Interactive coping exercises
5. **📔 My Journal & Mood Tracking** - Personal mood journaling
6. **🆘 Crisis Resources & Help** - 24/7 hotlines & support
7. **👥 For Parents & Caregivers** - Parental guidance
8. **🤖 AI Companion Chat** - Claude API powered chatbot
9. **📚 How to Build This App** - Learning resources

### Key UI Components:

```html
<!-- Crisis Alert Banner (always visible) -->
<div id="crisisBanner">Call 988 for 24/7 Crisis Help</div>

<!-- Navigation Bar -->
<nav class="navbar">Mental Health Dashboard For Youth</nav>

<!-- Tab Navigation -->
<ul class="nav nav-tabs">
    <li><button class="nav-link active">Dashboard</button></li>
    <li><button class="nav-link">Risk Factors</button></li>
    ... (9 tabs total)
</ul>

<!-- Tab Content -->
<div class="tab-content">
    <!-- Dashboard Tab -->
    <div class="tab-pane active">
        <!-- Filter Controls -->
        <select id="yearSelect">...</select>
        <select id="stateSelect">...</select>
        <select id="ageGroupSelect">...</select>
        <select id="metricSelect">...</select>

        <!-- Charts -->
        <canvas id="trendChart"></canvas>
        <canvas id="ageGroupChart"></canvas>
        <canvas id="stateChart"></canvas>
        <canvas id="distributionChart"></canvas>

        <!-- Data Table -->
        <table id="dataTable"></table>
    </div>

    <!-- Other Tab Panes -->
    ...
</div>
```

---

## Data Flow Diagram

```
User Interaction
    ↓
Filter Selection → onFilterChange()
    ↓
app.js Updates currentFilters
    ↓
dataHandler.filterData(filters)
    ↓
Returns Filtered Dataset
    ↓
chartManager.updateCharts(filteredData)
    ↓
Chart.js Re-renders Visualizations
    ↓
Data Table Updates
    ↓
Display Updated Info to User
```

---

## Key Technologies Used

| Technology | Purpose |
|-----------|---------|
| **Vanilla JavaScript** | Core application logic (no frameworks) |
| **HTML5** | Semantic structure & forms |
| **CSS3** | Responsive styling & animations |
| **Bootstrap 5** | Grid layout & components |
| **Chart.js 4.4** | Interactive data visualizations |
| **Anthropic Claude API** | AI chatbot support |
| **localStorage** | Client-side data persistence (journal entries, API key) |
| **Fetch API** | Loading JSON data files |
| **Bootstrap Modals** | API key input dialog |

---

## Security Considerations

1. **API Key Management:**
   - Stored in browser localStorage (user's choice)
   - Never sent to backend
   - User can clear at any time

2. **Data Privacy:**
   - All journal entries stored locally in browser
   - No server-side storage of personal data
   - No tracking or analytics

3. **Content Safety:**
   - Crisis resources verified
   - Treatments from evidence-based sources
   - Appropriate content filtering in chat

---

## How to Extend the App

### Adding New Data:
```javascript
// 1. Add to data/yrbs-data.json
{
    "year": 2025,
    "state": "Texas",
    "age_group": "13-17",
    "metric": "depression",
    "value": 35.2
}

// 2. Dropdowns auto-populate from data
// 3. Charts automatically include new data
```

### Adding New Treatment:
```javascript
// 1. Add to data/treatments-data.json
{
    "name": "New Treatment",
    "category": "...",
    "conditions": ["depression"],
    "age_groups": ["13-17"],
    "effectiveness": "Effective",
    "description": "..."
}

// 2. Automatically appears in Treatments tab
```

### Adding New Coping Skill:
```javascript
// Similar to treatments
// Add to data/coping-data.json
// Automatically renders in Coping Skills tab
```

---

## Performance Considerations

1. **All data in memory** - Fast filtering and sorting
2. **No server calls** - Except for Claude API chat
3. **Lazy chart rendering** - Charts only update when needed
4. **Efficient event listeners** - Event delegation where possible
5. **Responsive design** - Works on mobile, tablet, desktop

---

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

---

## Summary

This is a **comprehensive mental health support application** that combines:
- **Educational data visualization** (CDC YRBS trends)
- **Evidence-based information** (treatments, risk factors)
- **Interactive tools** (journal, coping exercises, chat)
- **Crisis support** (immediate helpline access)
- **Caregiver resources** (parental guidance)

All built with **vanilla JavaScript** (no frameworks), making it fast, lightweight, and deployable anywhere with a simple web server.

The architecture is **modular**, with each feature in its own file (handler + UI), making it easy to maintain and extend.

---

**Created:** April 2026
**Purpose:** Educational Mental Health Resource for Youth
