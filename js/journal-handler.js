// Journal and Mood Tracking Handler

class JournalHandler {
    constructor() {
        this.prompts = null;
        this.entries = [];
        this.storageKey = 'mentalHealthJournal';
        this.moodEmojis = {
            1: '😢',
            2: '😔',
            3: '😐',
            4: '🙂',
            5: '😊',
            6: '😄',
            7: '🤩',
            8: '🎉',
            9: '🌟',
            10: '💖'
        };
    }

    // Load journal prompts from JSON
    async loadPrompts() {
        try {
            const response = await fetch('data/journal-prompts.json');
            if (!response.ok) throw new Error('Failed to load prompts');
            this.prompts = await response.json();
            return true;
        } catch (error) {
            console.error('Error loading journal prompts:', error);
            return false;
        }
    }

    // Load entries from local storage
    loadEntries() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.entries = stored ? JSON.parse(stored) : [];
            return true;
        } catch (error) {
            console.error('Error loading journal entries:', error);
            this.entries = [];
            return false;
        }
    }

    // Save entries to local storage
    saveEntries() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
            return true;
        } catch (error) {
            console.error('Error saving journal entries:', error);
            return false;
        }
    }

    // Create a new journal entry
    createEntry(mood, note, condition = '', category = '') {
        const entry = {
            id: Date.now(),
            date: new Date().toISOString(),
            mood: parseInt(mood),
            note: note.trim(),
            condition: condition,
            category: category,
            emoji: this.moodEmojis[mood]
        };
        this.entries.push(entry);
        this.saveEntries();
        return entry;
    }

    // Get all entries
    getAllEntries() {
        return this.entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Get entries for the last N days
    getRecentEntries(days = 30) {
        const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
        return this.entries.filter(e => new Date(e.date).getTime() > cutoff)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Get mood statistics
    getMoodStats(days = 30) {
        const recent = this.getRecentEntries(days);
        if (recent.length === 0) return null;

        const moods = recent.map(e => e.mood);
        const avg = moods.reduce((a, b) => a + b, 0) / moods.length;
        const min = Math.min(...moods);
        const max = Math.max(...moods);
        const trend = this.calculateTrend(moods);

        return {
            average: parseFloat(avg.toFixed(1)),
            highest: max,
            lowest: min,
            total: moods.length,
            trend: trend,
            distribution: this.getDistribution(moods)
        };
    }

    // Calculate mood trend (improving, declining, stable)
    calculateTrend(moods) {
        if (moods.length < 3) return 'insufficient';

        const first = moods.slice(0, Math.ceil(moods.length / 2));
        const second = moods.slice(Math.ceil(moods.length / 2));

        const avgFirst = first.reduce((a, b) => a + b) / first.length;
        const avgSecond = second.reduce((a, b) => a + b) / second.length;

        const diff = avgSecond - avgFirst;
        if (diff > 0.5) return 'improving';
        if (diff < -0.5) return 'declining';
        return 'stable';
    }

    // Get mood distribution (how many entries at each mood level)
    getDistribution(moods) {
        const dist = {};
        for (let i = 1; i <= 10; i++) {
            dist[i] = moods.filter(m => m === i).length;
        }
        return dist;
    }

    // Get entries filtered by mood range
    getEntriesByMoodRange(minMood, maxMood) {
        return this.entries.filter(e => e.mood >= minMood && e.mood <= maxMood)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Search entries by text
    searchEntries(query) {
        const lowerQuery = query.toLowerCase();
        return this.entries.filter(e =>
            e.note.toLowerCase().includes(lowerQuery) ||
            e.condition.toLowerCase().includes(lowerQuery)
        ).sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Delete an entry
    deleteEntry(id) {
        const index = this.entries.findIndex(e => e.id === id);
        if (index > -1) {
            this.entries.splice(index, 1);
            this.saveEntries();
            return true;
        }
        return false;
    }

    // Delete all entries (with confirmation)
    clearAllEntries() {
        this.entries = [];
        this.saveEntries();
    }

    // Get random prompt based on condition
    getRandomPrompt(condition = '') {
        if (!this.prompts) return null;

        let prompts = this.prompts.general_prompts;

        if (condition && this.prompts.mood_specific[condition]) {
            // Mix condition-specific and general prompts
            prompts = [
                ...this.prompts.mood_specific[condition],
                ...this.prompts.general_prompts
            ];
        }

        return prompts[Math.floor(Math.random() * prompts.length)];
    }

    // Format date for display
    formatDate(isoString) {
        const date = new Date(isoString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined });
        }
    }

    // Export entries as JSON
    exportEntries() {
        return JSON.stringify(this.entries, null, 2);
    }

    // Get insights summary
    getInsights() {
        const stats = this.getMoodStats(30);
        if (!stats || stats.total === 0) return null;

        const insights = [];

        // Consistency insight
        if (stats.total >= 7) {
            insights.push(`You've been journaling ${stats.total} times in the last 30 days. That's great consistency!`);
        }

        // Mood trend insight
        if (stats.trend === 'improving') {
            insights.push(`Your mood has been improving over time. Keep doing what's working!`);
        } else if (stats.trend === 'declining') {
            insights.push(`Your mood has been lower recently. Consider reaching out for support.`);
        } else if (stats.trend === 'stable') {
            insights.push(`Your mood has been relatively stable. Continue your current practices.`);
        }

        // Average mood
        if (stats.average >= 7) {
            insights.push(`Your average mood is ${stats.average}/10 - you're doing well!`);
        } else if (stats.average >= 5) {
            insights.push(`Your average mood is ${stats.average}/10 - trying some coping strategies might help.`);
        } else if (stats.average < 5) {
            insights.push(`Your mood has been lower (${stats.average}/10). Please reach out to someone you trust.`);
        }

        return insights;
    }
}

// Create global instance
const journalHandler = new JournalHandler();
