// Risk Factors data handler for loading and filtering risk factors

class RiskFactorsHandler {
    constructor() {
        this.riskFactors = [];
    }

    // Load risk factors from JSON file
    async loadRiskFactors() {
        try {
            const response = await fetch('data/risk-factors-data.json');
            const data = await response.json();
            this.riskFactors = data.risk_factors;
            console.log(`Loaded ${this.riskFactors.length} risk factors`);
            return this.riskFactors;
        } catch (error) {
            console.error('Error loading risk factors:', error);
            return [];
        }
    }

    // Filter risk factors by condition and category
    filterRiskFactors(condition = '', category = '') {
        return this.riskFactors.filter(factor => {
            const matchesCondition = !condition || factor.conditions.includes(condition);
            const matchesCategory = !category || factor.category === category;
            return matchesCondition && matchesCategory;
        });
    }

    // Get unique categories
    getCategories() {
        const categories = new Set();
        this.riskFactors.forEach(factor => {
            categories.add(factor.category);
        });
        return Array.from(categories).sort();
    }

    // Get unique conditions
    getConditions() {
        const conditions = new Set();
        this.riskFactors.forEach(factor => {
            factor.conditions.forEach(condition => {
                conditions.add(condition);
            });
        });
        return Array.from(conditions).sort();
    }

    // Get risk factors by condition
    getByCondition(condition) {
        return this.riskFactors.filter(factor => factor.conditions.includes(condition));
    }

    // Get risk factors by category
    getByCategory(category) {
        return this.riskFactors.filter(factor => factor.category === category);
    }

    // Format condition name for display
    formatConditionName(condition) {
        const names = {
            'depression': 'Depression',
            'anxiety': 'Anxiety',
            'self_harm': 'Self-Harm'
        };
        return names[condition] || condition;
    }

    // Format category name for display
    formatCategoryName(category) {
        const names = {
            'Biological': 'Biological Factors',
            'Environmental': 'Environmental Factors',
            'Social': 'Social Factors',
            'Developmental': 'Developmental Factors',
            'Behavioral': 'Behavioral Factors',
            'Lifestyle': 'Lifestyle Factors',
            'Systemic': 'Systemic Factors'
        };
        return names[category] || category;
    }

    // Get category badge color
    getCategoryBadge(category) {
        const badges = {
            'Biological': 'info',
            'Environmental': 'warning',
            'Social': 'primary',
            'Developmental': 'secondary',
            'Behavioral': 'danger',
            'Lifestyle': 'success',
            'Systemic': 'dark'
        };
        return badges[category] || 'secondary';
    }

    // Format risk factor details for display
    formatRiskFactorDetails(factor) {
        return {
            categoryBadge: this.getCategoryBadge(factor.category),
            conditionsList: factor.conditions.map(c => this.formatConditionName(c)).join(', '),
            categoryName: this.formatCategoryName(factor.category)
        };
    }

    // Get primary resource for risk factor
    getPrimaryResource(factor) {
        return factor.resources && factor.resources.length > 0 ? factor.resources[0] : '#';
    }

    // Get risk level (based on prevalence)
    getRiskLevel(factor) {
        if (!factor.prevalence) return 'low';
        const prevalenceNum = parseInt(factor.prevalence);
        if (prevalenceNum >= 60) return 'high';
        if (prevalenceNum >= 40) return 'medium';
        return 'low';
    }
}

// Create global risk factors handler instance
const riskFactorsHandler = new RiskFactorsHandler();
