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
        // Load crisis resources first (they're critical)
        const crisisLoaded = await crisisHandler.loadCrisisResources();
        if (!crisisLoaded) {
            console.error('Failed to load crisis resources');
            return;
        }

        // Load state-specific crisis resources
        const stateResourcesLoaded = await crisisHandler.loadStateResources();
        if (!stateResourcesLoaded) {
            console.error('Failed to load state crisis resources');
        }

        // Initialize crisis UI
        crisisUI.init();

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

        // Load risk factors
        const riskFactorsLoaded = await riskFactorsHandler.loadRiskFactors();
        if (!riskFactorsLoaded) {
            console.error('Failed to load risk factors');
            return;
        }

        // Load coping skills
        const copingLoaded = await copingHandler.loadCopingSkills();
        if (!copingLoaded) {
            console.error('Failed to load coping skills');
        }

        // Initialize coping UI
        copingUI.init();

        // Populate coping filters
        this.populateCopingFilters();

        // Journal prompts
        const promptsLoaded = await journalHandler.loadPrompts();
        if (!promptsLoaded) {
            console.error('Failed to load journal prompts');
        }

        // Load existing journal entries
        journalHandler.loadEntries();

        // Initialize journal UI
        journalUI.init();

        // Populate filter dropdowns
        this.populateDropdowns();

        // Populate treatment filters
        this.populateTreatmentFilters();

        // Populate risk factor filters
        this.populateRiskFactorFilters();

        // Load parent guidance
        const parentGuidanceLoaded = await parentHandler.loadGuidance();
        if (!parentGuidanceLoaded) {
            console.error('Failed to load parent guidance');
        }

        // Initialize parent UI
        await parentUI.init();

        // Set up event listeners
        this.setupEventListeners();
        this.setupTreatmentEventListeners();
        this.setupRiskFactorEventListeners();

        // Initial chart load
        this.updateAllCharts();

        // Initial treatments load
        this.updateTreatmentsDisplay();

        // Initial risk factors load
        this.updateRiskFactorsDisplay();
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

    // Populate risk factor filter dropdowns
    populateRiskFactorFilters() {
        const categories = riskFactorsHandler.getCategories();

        this.populateSelect('riskFactorCategorySelect', categories);
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

    // Set up event listeners for risk factor filters
    setupRiskFactorEventListeners() {
        document.getElementById('riskFactorConditionSelect')?.addEventListener('change', () => this.onRiskFactorFilterChange());
        document.getElementById('riskFactorCategorySelect')?.addEventListener('change', () => this.onRiskFactorFilterChange());
        document.getElementById('resetRiskFactorFilters')?.addEventListener('click', () => this.resetRiskFactorFilters());
    }

    // Handle filter changes
    onFilterChange() {
        this.currentFilters.year = document.getElementById('yearSelect').value ? parseInt(document.getElementById('yearSelect').value) : '';
        this.currentFilters.state = document.getElementById('stateSelect').value || '';
        this.currentFilters.age_group = document.getElementById('ageGroupSelect').value || '';
        this.currentFilters.metric = document.getElementById('metricSelect').value || '';

        // Update crisis resources by state
        crisisUI.updateByState(this.currentFilters.state);

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

    // Handle risk factor filter changes
    onRiskFactorFilterChange() {
        const condition = document.getElementById('riskFactorConditionSelect').value || '';
        const category = document.getElementById('riskFactorCategorySelect').value || '';

        this.updateRiskFactorsDisplay(condition, category);
    }

    // Update risk factors display
    updateRiskFactorsDisplay(condition = '', category = '') {
        const filtered = riskFactorsHandler.filterRiskFactors(condition, category);
        riskFactorsUI.updateRiskFactorCards(filtered);
    }

    // Reset risk factor filters
    resetRiskFactorFilters() {
        document.getElementById('riskFactorConditionSelect').value = '';
        document.getElementById('riskFactorCategorySelect').value = '';
        this.updateRiskFactorsDisplay();
    }

    // Populate coping skill filters
    populateCopingFilters() {
        const categories = copingHandler.getCategories();
        const conditions = copingHandler.getConditions();

        this.populateSelect('copingCategorySelect', categories);
        this.populateSelect('copingConditionSelect', conditions);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const app = new MentalHealthApp();
    await app.init();
});
