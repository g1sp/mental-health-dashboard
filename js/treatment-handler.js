// Treatment handler for loading and managing evidence-based treatments

class TreatmentHandler {
    constructor() {
        this.treatments = [];
        this.filteredTreatments = [];
        this.currentFilters = {
            condition: '',
            category: '',
            ageGroup: ''
        };
    }

    // Load treatments data
    async loadTreatments() {
        try {
            const response = await fetch('data/treatments-data.json');
            if (!response.ok) throw new Error('Failed to load treatments');
            const jsonData = await response.json();
            this.treatments = jsonData.treatments;
            this.filteredTreatments = [...this.treatments];
            return true;
        } catch (error) {
            console.error('Error loading treatments:', error);
            return false;
        }
    }

    // Get unique categories
    getCategories() {
        return [...new Set(this.treatments.map(t => t.category))].sort();
    }

    // Get unique age groups
    getAgeGroups() {
        const groups = new Set();
        this.treatments.forEach(t => {
            t.age_groups.forEach(ag => groups.add(ag));
        });
        return ['9-12', '13-17', '18-25'].filter(ag => groups.has(ag));
    }

    // Filter treatments based on criteria
    filterTreatments(criteria) {
        this.filteredTreatments = this.treatments.filter(treatment => {
            if (criteria.condition && !treatment.conditions.includes(criteria.condition)) {
                return false;
            }
            if (criteria.category && treatment.category !== criteria.category) {
                return false;
            }
            if (criteria.ageGroup && !treatment.age_groups.includes(criteria.ageGroup)) {
                return false;
            }
            return true;
        });
        return this.filteredTreatments;
    }

    // Get effectiveness color based on value
    getEffectivenessColor(effectiveness) {
        if (effectiveness >= 80) return '#27ae60'; // Green
        if (effectiveness >= 70) return '#f39c12'; // Orange
        return '#3498db'; // Blue
    }

    // Format treatment details for display
    formatTreatmentDetails(treatment) {
        return {
            ...treatment,
            conditionsList: treatment.conditions.map(c => this.formatConditionName(c)).join(', '),
            ageGroupsList: treatment.age_groups.join(', '),
            categoryBadge: this.getCategoryBadge(treatment.category),
            effectivenessPercentage: treatment.effectiveness,
            effectivenessColor: this.getEffectivenessColor(treatment.effectiveness)
        };
    }

    // Format condition names
    formatConditionName(condition) {
        const names = {
            'depression': 'Depression',
            'anxiety': 'Anxiety',
            'self_harm': 'Self-Harm'
        };
        return names[condition] || condition;
    }

    // Get category badge styling
    getCategoryBadge(category) {
        const badges = {
            'Psychotherapy': 'primary',
            'Medication': 'danger',
            'Family Therapy': 'info',
            'Prevention/Early Intervention': 'success',
            'Support': 'warning',
            'Lifestyle Intervention': 'secondary',
            'Crisis Support': 'danger',
            'Integrated Treatment': 'info'
        };
        return badges[category] || 'secondary';
    }

    // Get primary resource link
    getPrimaryResource(treatment) {
        return treatment.resources && treatment.resources.length > 0
            ? treatment.resources[0]
            : 'https://www.samhsa.gov/';
    }
}

// Create global treatment handler instance
const treatmentHandler = new TreatmentHandler();
