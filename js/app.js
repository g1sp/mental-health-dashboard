// Main application logic

class MentalHealthApp {
    constructor() {
        this.currentFilters = {
            year: '',
            state: '',
            age_group: '',
            metric: ''
        };
    }

    // Initialize the application
    async init() {
        // Load data
        const dataLoaded = await dataHandler.loadData();
        if (!dataLoaded) {
            console.error('Failed to load data');
            return;
        }

        // Load treatments
        const treatmentsLoaded = await treatmentHandler.loadTreatments();
        if (!treatmentsLoaded) {
            console.error('Failed to load treatments');
            return;
        }

        // Populate filter dropdowns
        this.populateDropdowns();

        // Populate treatment filters
        this.populateTreatmentFilters();

        // Set up event listeners
        this.setupEventListeners();
        this.setupTreatmentEventListeners();

        // Initial chart load
        this.updateAllCharts();

        // Initial treatments load
        this.updateTreatmentsDisplay();
    }

    // Populate dropdown selectors with unique values
    populateDropdowns() {
        const years = dataHandler.getUniqueValues('year');
        const states = dataHandler.getUniqueValues('state');
        const ageGroups = dataHandler.getUniqueValues('age_group');
        const metrics = dataHandler.getUniqueValues('metric');

        this.populateSelect('yearSelect', years);
        this.populateSelect('stateSelect', states);
        this.populateSelect('ageGroupSelect', ageGroups);
        this.populateSelect('metricSelect', metrics.map(m => ({
            value: m,
            display: dataHandler.formatMetricName(m)
        })));
    }

    // Helper to populate select options
    populateSelect(selectId, options) {
        const select = document.getElementById(selectId);
        if (!select) return;

        // Clear existing options (keep the first "All" option)
        while (select.options.length > 1) {
            select.remove(1);
        }

        // Add options
        options.forEach(option => {
            const opt = document.createElement('option');
            if (typeof option === 'object') {
                opt.value = option.value;
                opt.textContent = option.display;
            } else {
                opt.value = option;
                opt.textContent = option;
            }
            select.appendChild(opt);
        });
    }

    // Populate treatment filter dropdowns
    populateTreatmentFilters() {
        const categories = treatmentHandler.getCategories();
        const ageGroups = treatmentHandler.getAgeGroups();

        this.populateSelect('categorySelect', categories);
        this.populateSelect('treatmentAgeSelect', ageGroups);
    }

    // Set up event listeners for filters
    setupEventListeners() {
        document.getElementById('yearSelect')?.addEventListener('change', () => this.onFilterChange());
        document.getElementById('stateSelect')?.addEventListener('change', () => this.onFilterChange());
        document.getElementById('ageGroupSelect')?.addEventListener('change', () => this.onFilterChange());
        document.getElementById('metricSelect')?.addEventListener('change', () => this.onFilterChange());
    }

    // Set up event listeners for treatment filters
    setupTreatmentEventListeners() {
        document.getElementById('conditionSelect')?.addEventListener('change', () => this.onTreatmentFilterChange());
        document.getElementById('categorySelect')?.addEventListener('change', () => this.onTreatmentFilterChange());
        document.getElementById('treatmentAgeSelect')?.addEventListener('change', () => this.onTreatmentFilterChange());
    }

    // Handle filter changes
    onFilterChange() {
        this.currentFilters.year = document.getElementById('yearSelect').value ? parseInt(document.getElementById('yearSelect').value) : '';
        this.currentFilters.state = document.getElementById('stateSelect').value || '';
        this.currentFilters.age_group = document.getElementById('ageGroupSelect').value || '';
        this.currentFilters.metric = document.getElementById('metricSelect').value || '';

        this.updateAllCharts();
        this.updateDataTable();
    }

    // Update all charts
    updateAllCharts() {
        chartManager.updateCharts(this.currentFilters);
    }

    // Update data table
    updateDataTable() {
        const tableBody = document.getElementById('dataTable');
        if (!tableBody) return;

        // Get filtered data
        const filteredData = dataHandler.filterData(this.currentFilters);

        // Clear table
        tableBody.innerHTML = '';

        // Check if data exists
        if (filteredData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No data available for selected filters</td></tr>';
            return;
        }

        // Add rows
        filteredData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.year}</td>
                <td>${item.state}</td>
                <td>${item.age_group}</td>
                <td>${dataHandler.formatMetricName(item.metric)}</td>
                <td><strong>${item.value.toFixed(2)}%</strong></td>
            `;
            tableBody.appendChild(row);
        });

        // Add summary row if data is filtered
        if (filteredData.length > 1) {
            const avgValue = (filteredData.reduce((sum, item) => sum + item.value, 0) / filteredData.length).toFixed(2);
            const summaryRow = document.createElement('tr');
            summaryRow.className = 'table-info fw-bold';
            summaryRow.innerHTML = `
                <td colspan="4">Average</td>
                <td>${avgValue}%</td>
            `;
            tableBody.appendChild(summaryRow);
        }
    }

    // Handle treatment filter changes
    onTreatmentFilterChange() {
        const condition = document.getElementById('conditionSelect').value || '';
        const category = document.getElementById('categorySelect').value || '';
        const ageGroup = document.getElementById('treatmentAgeSelect').value || '';

        this.updateTreatmentsDisplay(condition, category, ageGroup);
    }

    // Update treatments display
    updateTreatmentsDisplay(condition = '', category = '', ageGroup = '') {
        const filters = {
            condition: condition,
            category: category,
            ageGroup: ageGroup
        };
        const filtered = treatmentHandler.filterTreatments(filters);
        treatmentUI.updateTreatmentCards(filtered);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const app = new MentalHealthApp();
    await app.init();
});
