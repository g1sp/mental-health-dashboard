// Crisis Resources Handler
class CrisisHandler {
    constructor() {
        this.crisisResources = [];
        this.stateResources = {};
    }

    async loadCrisisResources() {
        try {
            const response = await fetch('data/crisis-resources-data.json');
            const data = await response.json();
            this.crisisResources = data.resources;
            console.log('Crisis resources loaded:', this.crisisResources.length);
            return true;
        } catch (error) {
            console.error('Failed to load crisis resources:', error);
            return false;
        }
    }

    async loadStateResources() {
        try {
            const response = await fetch('data/state-crisis-resources.json');
            const data = await response.json();
            this.stateResources = data['state-resources'] || {};
            console.log('State crisis resources loaded for', Object.keys(this.stateResources).length, 'states');
            return true;
        } catch (error) {
            console.error('Failed to load state crisis resources:', error);
            return false;
        }
    }

    getAll() {
        return this.crisisResources;
    }

    getById(id) {
        return this.crisisResources.find(r => r.id === id);
    }

    getEmergencyResources() {
        // Return the two most critical resources
        return this.crisisResources.filter(r => r.id === 'crisis_988' || r.id === 'emergency_911');
    }

    getAllResources() {
        return this.crisisResources;
    }

    getByState(state) {
        if (!state || state === '') {
            return [];
        }
        return this.stateResources[state] || [];
    }

    getCombined(state) {
        // Returns national resources + state resources
        const combined = {
            national: this.crisisResources,
            state: this.getByState(state)
        };
        return combined;
    }
}

// Create global instance
const crisisHandler = new CrisisHandler();
