// Journal UI Manager

class JournalUI {
    constructor() {
        this.currentMood = 5;
        this.selectedCondition = '';
        this.currentPrompt = null;
    }

    // Initialize journal UI
    init() {
        this.setupEventListeners();
        this.loadInitialView();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Mood selector
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectMood(e.target.closest('.mood-btn').dataset.mood);
            });
        });

        // Condition selector
        const conditionSelect = document.getElementById('journalConditionSelect');
        if (conditionSelect) {
            conditionSelect.addEventListener('change', (e) => {
                this.selectedCondition = e.target.value;
                this.getNewPrompt();
            });
        }

        // Submit entry
        const submitBtn = document.getElementById('submitJournalEntry');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitEntry());
        }

        // Get new prompt
        const promptBtn = document.getElementById('getNewPrompt');
        if (promptBtn) {
            promptBtn.addEventListener('click', () => this.getNewPrompt());
        }

        // Tabs within journal
        const journalTabs = document.querySelectorAll('.journal-tab-btn');
        journalTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchJournalTab(e.target.dataset.tab);
            });
        });

        // Search
        const searchInput = document.getElementById('journalSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }

        // Filter by mood
        const moodFilterRange = document.getElementById('moodFilterRange');
        if (moodFilterRange) {
            moodFilterRange.addEventListener('input', (e) => {
                this.filterByMood(e.target.value);
            });
        }

        // Clear all entries
        const clearBtn = document.getElementById('clearAllEntriesBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.confirmClearAll());
        }

        // Export entries
        const exportBtn = document.getElementById('exportEntriesBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportEntries());
        }
    }

    // Select mood level
    selectMood(mood) {
        this.currentMood = parseInt(mood);
        const buttons = document.querySelectorAll('.mood-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mood="${mood}"]`).classList.add('active');
        this.updateMoodDisplay();
    }

    // Update mood display
    updateMoodDisplay() {
        const display = document.getElementById('selectedMoodDisplay');
        if (display) {
            const emoji = journalHandler.moodEmojis[this.currentMood];
            const labels = ['Very Bad', 'Bad', 'Poor', 'Low', 'Okay', 'Good', 'Great', 'Very Great', 'Excellent', 'Amazing'];
            display.innerHTML = `<div class="text-center">
                <div class="fs-1">${emoji}</div>
                <div class="text-muted">${this.currentMood}/10 - ${labels[this.currentMood - 1]}</div>
            </div>`;
        }
    }

    // Get new random prompt
    getNewPrompt() {
        this.currentPrompt = journalHandler.getRandomPrompt(this.selectedCondition);
        const promptEl = document.getElementById('journalPrompt');
        if (promptEl && this.currentPrompt) {
            promptEl.textContent = this.currentPrompt;
            promptEl.parentElement.style.display = 'block';
        }
    }

    // Submit journal entry
    submitEntry() {
        const textarea = document.getElementById('journalNote');
        const note = textarea.value.trim();

        if (!note) {
            alert('Please write something in your journal entry.');
            return;
        }

        journalHandler.createEntry(this.currentMood, note, this.selectedCondition);

        // Clear form
        textarea.value = '';
        this.currentMood = 5;
        this.selectedCondition = '';
        this.selectMood(5);

        // Show success message
        this.showNotification('Entry saved! 💾', 'success');

        // Refresh history
        this.loadHistoryView();
        this.loadStatsView();
    }

    // Switch between journal tabs
    switchJournalTab(tab) {
        // Hide all tabs
        document.querySelectorAll('.journal-tab-content').forEach(el => {
            el.style.display = 'none';
        });

        // Remove active class
        document.querySelectorAll('.journal-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const tabEl = document.getElementById(`journal${tab}`);
        if (tabEl) tabEl.style.display = 'block';

        // Add active class to button
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Load content if needed
        if (tab === 'History') this.loadHistoryView();
        if (tab === 'Stats') this.loadStatsView();
        if (tab === 'Insights') this.loadInsightsView();
    }

    // Load history view
    loadHistoryView() {
        const container = document.getElementById('journalHistoryContainer');
        if (!container) return;

        const entries = journalHandler.getAllEntries();

        if (entries.length === 0) {
            container.innerHTML = '<div class="text-center text-muted py-5"><p>No entries yet. Start journaling to see your history here!</p></div>';
            return;
        }

        let html = '<div class="journal-entries">';

        entries.forEach(entry => {
            const date = journalHandler.formatDate(entry.date);
            const truncated = entry.note.length > 100 ? entry.note.substring(0, 100) + '...' : entry.note;

            html += `
                <div class="card mb-3 border-start border-5" style="border-color: ${this.getMoodColor(entry.mood)};">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <div class="fs-4">${entry.emoji} ${entry.mood}/10</div>
                                <small class="text-muted">${date}</small>
                            </div>
                            <button class="btn btn-sm btn-outline-danger" onclick="journalUI.deleteEntry(${entry.id})">
                                Delete
                            </button>
                        </div>
                        <p class="mb-2">${this.escapeHtml(truncated)}</p>
                        ${entry.condition ? `<span class="badge bg-info">${entry.condition}</span>` : ''}
                        <button class="btn btn-sm btn-link" onclick="journalUI.viewFullEntry(${entry.id})">
                            View Full
                        </button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    // View full entry in modal
    viewFullEntry(id) {
        const entry = journalHandler.entries.find(e => e.id === id);
        if (!entry) return;

        const date = journalHandler.formatDate(entry.date);
        const modalBody = `
            <div class="mb-3">
                <h6 class="text-muted mb-2">Date</h6>
                <p>${date}</p>
            </div>
            <div class="mb-3">
                <h6 class="text-muted mb-2">Mood</h6>
                <p class="fs-4">${entry.emoji} ${entry.mood}/10</p>
            </div>
            ${entry.condition ? `
                <div class="mb-3">
                    <h6 class="text-muted mb-2">Condition</h6>
                    <p>${entry.condition}</p>
                </div>
            ` : ''}
            <div class="mb-3">
                <h6 class="text-muted mb-2">Entry</h6>
                <p style="white-space: pre-wrap;">${this.escapeHtml(entry.note)}</p>
            </div>
        `;

        // Use Bootstrap modal if available
        const modal = new bootstrap.Modal(document.getElementById('journalEntryModal'));
        document.getElementById('journalEntryModalBody').innerHTML = modalBody;
        modal.show();
    }

    // Delete entry
    deleteEntry(id) {
        if (confirm('Are you sure you want to delete this entry?')) {
            journalHandler.deleteEntry(id);
            this.loadHistoryView();
            this.loadStatsView();
            this.showNotification('Entry deleted', 'info');
        }
    }

    // Load statistics view
    loadStatsView() {
        const container = document.getElementById('journalStatsContainer');
        if (!container) return;

        const stats = journalHandler.getMoodStats(30);

        if (!stats || stats.total === 0) {
            container.innerHTML = '<div class="text-center text-muted py-5"><p>Journal some entries to see your statistics!</p></div>';
            return;
        }

        const trendEmoji = { improving: '📈', declining: '📉', stable: '➡️', insufficient: '❓' }[stats.trend] || '❓';

        let html = `
            <div class="row g-3 mb-4">
                <div class="col-md-6">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6 class="card-title text-muted">Average Mood</h6>
                            <div class="fs-3 fw-bold">${stats.average}/10</div>
                            <small class="text-muted">${journalHandler.moodEmojis[Math.round(stats.average)]}</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6 class="card-title text-muted">Trend</h6>
                            <div class="fs-3 fw-bold">${trendEmoji} ${stats.trend}</div>
                            <small class="text-muted">Last 30 days</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6 class="card-title text-muted">Highest Mood</h6>
                            <div class="fs-3 fw-bold">${stats.highest}/10</div>
                            <small class="text-muted">${journalHandler.moodEmojis[stats.highest]}</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6 class="card-title text-muted">Lowest Mood</h6>
                            <div class="fs-3 fw-bold">${stats.lowest}/10</div>
                            <small class="text-muted">${journalHandler.moodEmojis[stats.lowest]}</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6 class="card-title text-muted">Total Entries</h6>
                            <div class="fs-3 fw-bold">${stats.total}</div>
                            <small class="text-muted">In last 30 days</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6 class="card-title text-muted">Consistency</h6>
                            <div class="fs-3 fw-bold">${Math.round((stats.total / 30) * 100)}%</div>
                            <small class="text-muted">Journaling rate</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h6 class="card-title mb-3">Mood Distribution</h6>
                    <div class="mood-distribution">
        `;

        for (let i = 1; i <= 10; i++) {
            const count = stats.distribution[i];
            const width = stats.total > 0 ? (count / Math.max(...Object.values(stats.distribution))) * 100 : 0;
            html += `
                <div class="mb-2">
                    <div class="d-flex justify-content-between mb-1 small">
                        <span>${journalHandler.moodEmojis[i]} ${i}</span>
                        <span>${count}</span>
                    </div>
                    <div class="progress" style="height: 20px;">
                        <div class="progress-bar" style="width: ${width}%; background-color: ${this.getMoodColor(i)};"></div>
                    </div>
                </div>
            `;
        }

        html += `
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // Load insights view
    loadInsightsView() {
        const container = document.getElementById('journalInsightsContainer');
        if (!container) return;

        const insights = journalHandler.getInsights();

        if (!insights || insights.length === 0) {
            container.innerHTML = '<div class="text-center text-muted py-5"><p>Add more entries to unlock personalized insights!</p></div>';
            return;
        }

        let html = '<div class="insights-list">';

        insights.forEach((insight, index) => {
            const icons = ['💡', '📊', '🎯', '✨', '💪'];
            const icon = icons[index % icons.length];

            html += `
                <div class="alert alert-info alert-dismissible fade show mb-3" role="alert">
                    <strong>${icon} Insight:</strong> ${insight}
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    // Perform search
    performSearch(query) {
        const container = document.getElementById('journalHistoryContainer');
        if (!container) return;

        if (!query.trim()) {
            this.loadHistoryView();
            return;
        }

        const results = journalHandler.searchEntries(query);

        if (results.length === 0) {
            container.innerHTML = '<div class="text-center text-muted py-5"><p>No entries found matching your search.</p></div>';
            return;
        }

        let html = '<div class="journal-entries">';

        results.forEach(entry => {
            const date = journalHandler.formatDate(entry.date);
            const truncated = entry.note.length > 100 ? entry.note.substring(0, 100) + '...' : entry.note;

            html += `
                <div class="card mb-3 border-start border-5" style="border-color: ${this.getMoodColor(entry.mood)};">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <div class="fs-4">${entry.emoji} ${entry.mood}/10</div>
                                <small class="text-muted">${date}</small>
                            </div>
                            <button class="btn btn-sm btn-outline-danger" onclick="journalUI.deleteEntry(${entry.id})">
                                Delete
                            </button>
                        </div>
                        <p class="mb-2">${this.escapeHtml(truncated)}</p>
                        ${entry.condition ? `<span class="badge bg-info">${entry.condition}</span>` : ''}
                        <button class="btn btn-sm btn-link" onclick="journalUI.viewFullEntry(${entry.id})">
                            View Full
                        </button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    // Filter by mood
    filterByMood(value) {
        const [min, max] = value.split('-').map(Number);
        const container = document.getElementById('journalHistoryContainer');
        if (!container) return;

        const entries = journalHandler.getEntriesByMoodRange(min, max);

        if (entries.length === 0) {
            container.innerHTML = '<div class="text-center text-muted py-5"><p>No entries in this mood range.</p></div>';
            return;
        }

        let html = '<div class="journal-entries">';

        entries.forEach(entry => {
            const date = journalHandler.formatDate(entry.date);
            const truncated = entry.note.length > 100 ? entry.note.substring(0, 100) + '...' : entry.note;

            html += `
                <div class="card mb-3 border-start border-5" style="border-color: ${this.getMoodColor(entry.mood)};">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <div class="fs-4">${entry.emoji} ${entry.mood}/10</div>
                                <small class="text-muted">${date}</small>
                            </div>
                            <button class="btn btn-sm btn-outline-danger" onclick="journalUI.deleteEntry(${entry.id})">
                                Delete
                            </button>
                        </div>
                        <p class="mb-2">${this.escapeHtml(truncated)}</p>
                        ${entry.condition ? `<span class="badge bg-info">${entry.condition}</span>` : ''}
                        <button class="btn btn-sm btn-link" onclick="journalUI.viewFullEntry(${entry.id})">
                            View Full
                        </button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    // Export entries
    exportEntries() {
        const data = journalHandler.exportEntries();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mental-health-journal-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showNotification('Journal exported! 📥', 'success');
    }

    // Confirm clear all
    confirmClearAll() {
        if (confirm('Are you sure you want to delete ALL entries? This cannot be undone.')) {
            if (confirm('This action is permanent. Are you absolutely sure?')) {
                journalHandler.clearAllEntries();
                this.loadHistoryView();
                this.loadStatsView();
                this.showNotification('All entries cleared', 'info');
            }
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '9999';
        alertDiv.style.minWidth = '300px';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // Get color for mood level
    getMoodColor(mood) {
        const mood_num = parseInt(mood);
        if (mood_num <= 2) return '#e74c3c';      // Red
        if (mood_num <= 4) return '#f39c12';      // Orange
        if (mood_num <= 6) return '#f1c40f';      // Yellow
        if (mood_num <= 8) return '#2ecc71';      // Green
        return '#27ae60';                         // Dark Green
    }

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Load initial view
    loadInitialView() {
        this.selectMood(5);
        this.switchJournalTab('Entry');
    }
}

// Create global instance
const journalUI = new JournalUI();
