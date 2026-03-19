// Coping Skills Handler - Data management and filtering

class CopingHandler {
    constructor() {
        this.skills = null;
        this.storageKey = 'copingSkillsFavorites';
        this.historyKey = 'copingSkillsHistory';
        this.favorites = [];
        this.history = [];
    }

    // Load coping skills from JSON
    async loadCopingSkills() {
        try {
            const response = await fetch('data/coping-skills-data.json');
            if (!response.ok) throw new Error('Failed to load coping skills');
            this.skills = await response.json();
            this.loadFavorites();
            this.loadHistory();
            return true;
        } catch (error) {
            console.error('Error loading coping skills:', error);
            return false;
        }
    }

    // Get all coping skills
    getCopingSkills() {
        return this.skills || [];
    }

    // Get coping skills by category
    getByCategory(category) {
        if (!this.skills) return [];
        if (!category) return this.skills;
        return this.skills.filter(skill => skill.category === category);
    }

    // Get unique categories
    getCategories() {
        if (!this.skills) return [];
        const categories = [...new Set(this.skills.map(s => s.category))];
        return categories.sort();
    }

    // Get coping skills by condition
    getByCondition(condition) {
        if (!this.skills) return [];
        if (!condition) return this.skills;
        return this.skills.filter(skill => skill.for_conditions.includes(condition));
    }

    // Get coping skills by difficulty
    getByDifficulty(difficulty) {
        if (!this.skills) return [];
        if (!difficulty) return this.skills;
        return this.skills.filter(skill => skill.difficulty === difficulty);
    }

    // Get a single skill by ID
    getSkillById(id) {
        if (!this.skills) return null;
        return this.skills.find(skill => skill.id === id);
    }

    // Favorites management
    loadFavorites() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.favorites = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            this.favorites = [];
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }

    addFavorite(id) {
        if (!this.favorites.includes(id)) {
            this.favorites.push(id);
            this.saveFavorites();
        }
    }

    removeFavorite(id) {
        this.favorites = this.favorites.filter(fav => fav !== id);
        this.saveFavorites();
    }

    isFavorite(id) {
        return this.favorites.includes(id);
    }

    getFavorites() {
        if (!this.skills) return [];
        return this.skills.filter(skill => this.favorites.includes(skill.id));
    }

    // History management
    loadHistory() {
        try {
            const stored = localStorage.getItem(this.historyKey);
            this.history = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading history:', error);
            this.history = [];
        }
    }

    saveHistory() {
        try {
            localStorage.setItem(this.historyKey, JSON.stringify(this.history));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    // Log exercise completion
    logExerciseCompletion(id) {
        const entry = {
            id: id,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString()
        };
        this.history.push(entry);
        this.saveHistory();
    }

    // Get exercise statistics
    getExerciseStats(days = 30) {
        const now = new Date();
        const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

        const recentHistory = this.history.filter(entry => {
            const entryDate = new Date(entry.timestamp);
            return entryDate >= pastDate;
        });

        // Calculate stats
        const totalCompleted = recentHistory.length;
        const uniqueExercises = new Set(recentHistory.map(e => e.id)).size;

        // Category breakdown
        const categoryBreakdown = {};
        recentHistory.forEach(entry => {
            const skill = this.getSkillById(entry.id);
            if (skill) {
                categoryBreakdown[skill.category] = (categoryBreakdown[skill.category] || 0) + 1;
            }
        });

        // Most used exercises
        const exerciseFrequency = {};
        recentHistory.forEach(entry => {
            exerciseFrequency[entry.id] = (exerciseFrequency[entry.id] || 0) + 1;
        });

        const mostUsed = Object.entries(exerciseFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([id, count]) => ({
                skill: this.getSkillById(parseInt(id)),
                count: count
            }));

        return {
            totalCompleted,
            uniqueExercises,
            categoryBreakdown,
            mostUsed,
            streak: this.calculateStreak(),
            daysInRange: days
        };
    }

    // Calculate current streak
    calculateStreak() {
        if (this.history.length === 0) return 0;

        // Sort history by date
        const sorted = [...this.history].sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (let i = 0; i < sorted.length; i++) {
            const entryDate = new Date(sorted[i].timestamp);
            entryDate.setHours(0, 0, 0, 0);

            const timeDiff = currentDate.getTime() - entryDate.getTime();
            const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

            if (daysDiff === streak) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    // Get all unique conditions from skills
    getConditions() {
        if (!this.skills) return [];
        const conditions = new Set();
        this.skills.forEach(skill => {
            skill.for_conditions.forEach(condition => conditions.add(condition));
        });
        return Array.from(conditions).sort();
    }
}

// Initialize handler
const copingHandler = new CopingHandler();
