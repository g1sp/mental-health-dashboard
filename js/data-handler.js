// Data handler for loading and filtering YRBS data

class DataHandler {
    constructor() {
        this.data = [];
        this.filteredData = [];
    }

    // Load data from JSON file
    async loadData() {
        try {
            const response = await fetch('data/yrbs-data.json');
            if (!response.ok) throw new Error('Failed to load data');
            const jsonData = await response.json();
            this.data = jsonData.data;
            this.filteredData = [...this.data];
            return true;
        } catch (error) {
            console.error('Error loading data:', error);
            return false;
        }
    }

    // Get unique values for a specific field
    getUniqueValues(field) {
        const values = [...new Set(this.data.map(item => item[field]))];
        return values.sort();
    }

    // Filter data based on criteria
    filterData(criteria) {
        this.filteredData = this.data.filter(item => {
            if (criteria.year && item.year !== criteria.year) return false;
            if (criteria.state && item.state !== criteria.state) return false;
            if (criteria.age_group && item.age_group !== criteria.age_group) return false;
            if (criteria.metric && item.metric !== criteria.metric) return false;
            return true;
        });
        return this.filteredData;
    }

    // Get aggregated data for visualizations
    getAggregatedByYear(criteria) {
        const filtered = this.filterByPartialCriteria(criteria, ['year']);
        const grouped = {};

        filtered.forEach(item => {
            const key = item.year;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item.value);
        });

        return Object.keys(grouped)
            .sort()
            .map(year => ({
                year,
                avgValue: (grouped[year].reduce((a, b) => a + b, 0) / grouped[year].length).toFixed(2)
            }));
    }

    // Get data by age group
    getByAgeGroup(criteria) {
        const filtered = this.filterByPartialCriteria(criteria, ['age_group']);
        const grouped = {};

        filtered.forEach(item => {
            const key = item.age_group;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item.value);
        });

        return Object.keys(grouped)
            .map(ageGroup => ({
                age_group: ageGroup,
                avgValue: (grouped[ageGroup].reduce((a, b) => a + b, 0) / grouped[ageGroup].length).toFixed(2)
            }))
            .sort((a, b) => {
                const orderMap = { '9-12': 1, '13-17': 2, '18-25': 3 };
                return (orderMap[a.age_group] || 0) - (orderMap[b.age_group] || 0);
            });
    }

    // Get data by state
    getByState(criteria) {
        const filtered = this.filterByPartialCriteria(criteria, ['state']);
        const grouped = {};

        filtered.forEach(item => {
            const key = item.state;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item.value);
        });

        return Object.keys(grouped)
            .sort()
            .map(state => ({
                state,
                avgValue: (grouped[state].reduce((a, b) => a + b, 0) / grouped[state].length).toFixed(2)
            }));
    }

    // Get data by metric
    getByMetric(criteria) {
        const filtered = this.filterByPartialCriteria(criteria, ['metric']);
        const grouped = {};

        filtered.forEach(item => {
            const key = item.metric;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item.value);
        });

        return Object.keys(grouped)
            .map(metric => ({
                metric: this.formatMetricName(metric),
                value: (grouped[metric].reduce((a, b) => a + b, 0) / grouped[metric].length).toFixed(2)
            }));
    }

    // Helper to filter by partial criteria (excluding specified fields)
    filterByPartialCriteria(criteria, excludeFields) {
        return this.data.filter(item => {
            for (const field in criteria) {
                if (excludeFields.includes(field)) continue;
                if (criteria[field] && item[field] !== criteria[field]) return false;
            }
            return true;
        });
    }

    // Get trend data over time for a specific metric/state
    getTrendData(criteria) {
        const filtered = this.filterByPartialCriteria(criteria, ['year']);
        const grouped = {};

        filtered.forEach(item => {
            const year = item.year;
            if (!grouped[year]) grouped[year] = [];
            grouped[year].push(item.value);
        });

        return Object.keys(grouped)
            .sort((a, b) => a - b)
            .map(year => ({
                year,
                value: (grouped[year].reduce((a, b) => a + b, 0) / grouped[year].length).toFixed(2)
            }));
    }

    // Format metric names for display
    formatMetricName(metric) {
        const names = {
            'depression': 'Depression',
            'anxiety': 'Anxiety',
            'self_harm': 'Self-Harm',
            'treatment_access': 'Treatment Access'
        };
        return names[metric] || metric;
    }

    // Get formatted data for table display
    getTableData() {
        return this.filteredData.map(item => ({
            ...item,
            metric: this.formatMetricName(item.metric)
        }));
    }
}

// Create global data handler instance
const dataHandler = new DataHandler();
