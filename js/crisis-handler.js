// Crisis Resources Handler
class CrisisHandler {
    constructor() {
        this.crisisResources = [];
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
}

// Create global instance
const crisisHandler = new CrisisHandler();
