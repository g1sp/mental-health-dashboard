// Parent Guidance Data Handler
class ParentHandler {
    constructor() {
        this.guidance = null;
    }

    async loadGuidance() {
        try {
            const response = await fetch('data/parent-guidance.json');
            this.guidance = await response.json();
            console.log('✓ Parent guidance loaded:', this.guidance.sections.length, 'sections');
            return this.guidance;
        } catch (error) {
            console.error('Error loading parent guidance:', error);
            return null;
        }
    }

    getAllSections() {
        return this.guidance?.sections || [];
    }

    getSectionById(id) {
        return this.guidance?.sections.find(s => s.id === id);
    }

    getSection(sectionId) {
        return this.getAllSections().find(s => s.id === sectionId);
    }

    getSectionIndex(sectionId) {
        return this.getAllSections().findIndex(s => s.id === sectionId);
    }

    // Get next section for navigation
    getNextSection(currentId) {
        const currentIndex = this.getSectionIndex(currentId);
        if (currentIndex < this.getAllSections().length - 1) {
            return this.getAllSections()[currentIndex + 1];
        }
        return null;
    }

    // Get previous section for navigation
    getPreviousSection(currentId) {
        const currentIndex = this.getSectionIndex(currentId);
        if (currentIndex > 0) {
            return this.getAllSections()[currentIndex - 1];
        }
        return null;
    }

    // Get quick tips by keyword
    searchTips(keyword) {
        const results = [];
        this.getAllSections().forEach(section => {
            if (section.title.toLowerCase().includes(keyword.toLowerCase()) ||
                section.content.overview.toLowerCase().includes(keyword.toLowerCase())) {
                results.push(section);
            }
        });
        return results;
    }

    // Get crisis resources summary
    getCrisisResources() {
        const section = this.getSectionById('red_flags');
        if (section && section.content.crisis) {
            return section.content.crisis;
        }
        return [];
    }

    // Track which sections parent has viewed (optional analytics)
    markSectionViewed(sectionId) {
        const viewed = JSON.parse(localStorage.getItem('parentGuidanceViewed') || '[]');
        if (!viewed.includes(sectionId)) {
            viewed.push(sectionId);
            localStorage.setItem('parentGuidanceViewed', JSON.stringify(viewed));
        }
    }

    getViewedSections() {
        return JSON.parse(localStorage.getItem('parentGuidanceViewed') || '[]');
    }

    resetViewedSections() {
        localStorage.removeItem('parentGuidanceViewed');
    }
}

// Create global instance
const parentHandler = new ParentHandler();
