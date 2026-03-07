# Mental Health Youth Dashboard

An interactive web application visualizing mental health data for youth in the United States. This dashboard provides a comprehensive view of mental health conditions, outcomes, and treatment access across different demographics and time periods.

## Features

### 📊 Dashboard Tab - Interactive Visualizations
- **Trend Charts**: Track mental health metrics over time
- **Age Group Comparisons**: Compare prevalence across age brackets (9-12, 13-17, 18-25)
- **State Analysis**: Compare mental health indicators across states
- **Distribution Charts**: View metric relationships and proportions

### 🎛️ Dashboard Tab - Customizable Filters
- Filter by year (2019, 2021, 2023)
- Filter by state (CA, TX, NY, FL)
- Filter by age group
- Filter by mental health metric

### 📈 Dashboard Tab - Metrics Tracked
- **Depression**: Depressive symptoms and diagnoses
- **Anxiety**: Anxiety symptoms and diagnoses
- **Self-Harm**: Non-suicidal self-injury behaviors
- **Treatment Access**: Access to mental health treatment and services

### 📋 Dashboard Tab - Data Table
Real-time filtered data table showing detailed values with automatic averages

### 💊 NEW: Evidence-Based Treatments Tab
Browse and explore 15 proven mental health interventions for youth:

**Treatment Types:**
- Psychotherapy (CBT, DBT, IPT, ACT)
- Medication (SSRIs)
- Family-Based Treatment
- Integrated Therapy + Medication (Gold Standard)
- Crisis Support Services
- Lifestyle Interventions
- Peer Support Groups
- School-Based Programs

**Interactive Features:**
- Filter by condition (depression, anxiety, self-harm)
- Filter by category (psychotherapy, medication, family therapy, etc.)
- Filter by age group (9-12, 13-17, 18-25)
- View effectiveness ratings with research data
- Click cards for detailed information
- Links to trusted resources (SAMHSA, NIMH, CDC, APA)

## Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Charts**: Chart.js 4.4.0
- **Styling**: Bootstrap 5.3.0
- **Data**: JSON-based (CDC YRBS format)
- **No Build Tools**: Direct CDN imports, runs in any modern browser

## Project Structure

```
MentalHealth/
├── index.html                   # Main dashboard page with tabs
├── README.md                    # This file
├── TREATMENTS_GUIDE.md          # User guide for treatments tab
├── QUICKSTART.md               # Quick start guide
├── css/
│   └── style.css               # Custom styling and responsive design
├── js/
│   ├── app.js                  # Main application logic and initialization
│   ├── data-handler.js         # Data loading and filtering functionality
│   ├── chart-manager.js        # Chart creation and management
│   ├── treatment-handler.js    # Treatments data loading and filtering
│   └── treatment-ui.js         # Treatments UI rendering and interactions
└── data/
    ├── yrbs-data.json          # CDC YRBS sample dataset (144 records)
    ├── treatments-data.json    # Evidence-based treatments (15 treatments)
    ├── README.md               # Data documentation
    └── TREATMENTS.md           # Detailed treatments documentation
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or build process required

### Running the Application

1. **Local File System**
   - Due to browser security, direct file opening may have limitations
   - Use a local web server for best results

2. **Python 3**
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

3. **Node.js (http-server)**
   ```bash
   npx http-server
   ```
   Then visit the provided localhost URL

4. **Live Server** (VS Code)
   - Install Live Server extension
   - Right-click `index.html` and select "Open with Live Server"

## Usage Guide

### Basic Workflow

1. **Load the Dashboard**: Open `index.html` in your web browser
2. **Explore Data**: All data loads automatically on startup
3. **Apply Filters**: Use dropdown selectors to filter data:
   - Select a year to see year-specific trends
   - Choose a state to focus on regional data
   - Pick an age group for demographic analysis
   - Select a metric to focus on specific mental health indicators
4. **View Results**: Charts and table update in real-time as filters change
5. **Analyze Trends**: Compare metrics across time periods and demographics

### Filter Examples

**Example 1**: Teen Depression in California
- State: California
- Age Group: 13-17
- Metric: Depression
- Result: See depression trends for CA teens over 2019-2023

**Example 2**: Treatment Access Across Age Groups (2023)
- Year: 2023
- Metric: Treatment Access
- Result: Compare treatment access across all age groups

**Example 3**: State Comparison (All Data)
- Result: Compare mental health metrics across all states

## Data Sources

- **Primary**: CDC Youth Risk Behavior Survey (YRBS)
- **Reference**: https://www.cdc.gov/yrbs
- **Supplements**: CDC/SAMHSA public health databases

## Data Interpretation

### What the Numbers Mean
- Values represent percentages of youth population
- Higher percentages indicate higher prevalence of the condition/metric
- Trends over time show improving or worsening mental health outcomes

### Key Insights to Look For
- **Rising Depression/Anxiety**: Increasing percentages suggest growing mental health challenges
- **Treatment Access**: Lower percentages may indicate barriers to care
- **Age Trends**: Typically, older youth show higher mental health challenges
- **State Variations**: Reflect differences in healthcare systems, demographics, and support services

## Technical Details

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Performance
- Data loads instantly (all data in memory)
- Charts render and update smoothly
- No server-side processing required

### Responsive Design
- Fully responsive layout
- Optimized for desktop, tablet, and mobile
- Touch-friendly controls

## Extending the Application

### Adding New Data
1. Edit `data/yrbs-data.json`
2. Follow the existing structure
3. Add new records with the same fields
4. Dropdowns automatically update with new values

### Adding New Metrics
1. Add data records with new metric values
2. Update visualization logic in `js/chart-manager.js` if needed
3. Add metric names to formatter in `js/data-handler.js`

### Customizing Styles
- Modify `css/style.css` for colors and layouts
- Edit Bootstrap classes in `index.html` for structure changes

## Known Limitations

- Sample data covers 4 states (CA, TX, NY, FL)
- Years available: 2019, 2021, 2023
- Age groups: 9-12, 13-17, 18-25
- For comprehensive national data, visit CDC YRBS website

## Educational Use

This dashboard is designed for:
- Health Education Classes
- Public Health Studies
- Data Visualization Learning
- Mental Health Awareness
- Research and Analysis Projects

## Documentation

- **TREATMENTS_GUIDE.md**: Complete guide to using the treatments tab
- **data/TREATMENTS.md**: Technical documentation of treatment data
- **data/README.md**: Documentation of YRBS mental health data
- **QUICKSTART.md**: Get started in 30 seconds

## Resources

- [CDC YRBS Official Site](https://www.cdc.gov/yrbs)
- [SAMHSA Resources](https://www.samhsa.gov/)
- [NIMH Mental Health Info](https://www.nimh.nih.gov/)
- [American Psychological Association](https://www.apa.org/)
- [988 Suicide & Crisis Lifeline](https://988lifeline.org/)
- [Mental Health America](https://www.mhanational.org/)
- [Chart.js Documentation](https://www.chartjs.org/)

## Support & Questions

For questions about:
- **Data**: See `data/README.md`
- **Code**: Check inline comments in JavaScript files
- **CDC YRBS**: Visit official CDC website

## License

This educational tool is provided for learning and research purposes. Data sources maintain their original licensing and attribution requirements.

---

**Last Updated**: March 2026
**Version**: 1.0
