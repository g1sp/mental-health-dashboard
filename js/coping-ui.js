// Coping Skills UI - Rendering and interactions

class CopingUI {
    constructor() {
        this.currentExerciseId = null;
        this.timerInterval = null;
        this.currentStep = 0;
        this.timeRemaining = 0;
        this.isRunning = false;
    }

    // Initialize UI
    init() {
        this.setupEventListeners();
        this.renderSkillsGrid(copingHandler.getCopingSkills());
        this.attachFooter();
    }

    attachFooter() {
        setTimeout(() => {
            const pane = document.getElementById('copingContent');
            if (pane && !pane.querySelector('.source-footer')) {
                const footer = FooterHelper.getSourceFooter('teenSourcesTab');
                const wrapper = document.createElement('div');
                wrapper.innerHTML = footer;
                wrapper.classList.add('source-footer');
                pane.appendChild(wrapper);
            }
        }, 100);
    }

    // Setup event listeners
    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.coping-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Category filter
        const categorySelect = document.getElementById('copingCategorySelect');
        if (categorySelect) {
            categorySelect.addEventListener('change', () => this.onCategoryChange());
        }

        // Difficulty filter
        const difficultySelect = document.getElementById('copingDifficultySelect');
        if (difficultySelect) {
            difficultySelect.addEventListener('change', () => this.onDifficultyChange());
        }

        // Condition filter
        const conditionSelect = document.getElementById('copingConditionSelect');
        if (conditionSelect) {
            conditionSelect.addEventListener('change', () => this.onConditionChange());
        }

        // Exercise modal buttons
        document.getElementById('startExerciseBtn')?.addEventListener('click', () => this.startExercise());
        document.getElementById('cancelExerciseBtn')?.addEventListener('click', () => this.cancelExercise());

        // Search
        const searchInput = document.getElementById('copingSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.onSearch());
        }
    }

    // Switch between tabs
    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.coping-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });

        // Remove active class from buttons
        document.querySelectorAll('.coping-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const tabElement = document.getElementById(`coping${tabName}`);
        if (tabElement) {
            tabElement.style.display = 'block';
        }

        // Add active class to button - find the button that was clicked
        const buttons = document.querySelectorAll('.coping-tab-btn');
        buttons.forEach(btn => {
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // Load appropriate content
        if (tabName === 'All') {
            this.renderSkillsGrid(copingHandler.getCopingSkills());
        } else if (tabName === 'Favorites') {
            const favorites = copingHandler.getFavorites();
            const grid = document.getElementById('copingFavoritesGrid');
            if (grid) {
                if (favorites.length === 0) {
                    grid.innerHTML = '<div class="col-12 text-center text-muted py-5">No favorites yet. Add some by clicking the heart icon!</div>';
                } else {
                    grid.innerHTML = '';
                    grid.className = 'row g-4';
                    this.renderSkillsGrid(favorites);
                }
            }
        } else if (tabName === 'Stats') {
            this.renderStats();
        }
    }

    // Render skills grid
    renderSkillsGrid(skills) {
        let grid = document.getElementById('copingSkillsGrid');
        const favoritesGrid = document.getElementById('copingFavoritesGrid');

        // Use favorites grid if available and displayed
        if (favoritesGrid && favoritesGrid.parentElement.style.display !== 'none') {
            grid = favoritesGrid;
        }

        if (!grid) return;

        if (skills.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center text-muted py-5"><p>No coping skills found</p></div>';
            return;
        }

        grid.innerHTML = skills.map(skill => `
            <div class="col-md-6 col-lg-4">
                <div class="card border-0 shadow-sm h-100 coping-skill-card" style="cursor: pointer;" onclick="copingUI.showExerciseDetail(${skill.id})">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h5 class="card-title mb-1">${skill.name}</h5>
                                <span class="badge bg-info">${skill.category}</span>
                                <span class="badge ${this.getDifficultyBadgeColor(skill.difficulty)}">${skill.difficulty}</span>
                            </div>
                            <button class="btn btn-sm btn-link p-0" onclick="event.stopPropagation(); copingUI.toggleFavorite(${skill.id})">
                                <span class="favorite-icon">${copingHandler.isFavorite(skill.id) ? '❤️' : '🤍'}</span>
                            </button>
                        </div>
                        <p class="card-text text-muted small mb-3">${skill.description}</p>
                        <div class="d-flex justify-content-between align-items-center text-muted small">
                            <span>⏱️ ${skill.duration} sec</span>
                            <span>${skill.for_conditions.join(', ')}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Get difficulty badge color
    getDifficultyBadgeColor(difficulty) {
        const colors = {
            'beginner': 'bg-success',
            'intermediate': 'bg-warning',
            'advanced': 'bg-danger'
        };
        return colors[difficulty] || 'bg-secondary';
    }

    // Show exercise detail modal
    showExerciseDetail(id) {
        const skill = copingHandler.getSkillById(id);
        if (!skill) return;

        this.currentExerciseId = id;

        const modal = document.getElementById('copingExerciseModal');
        if (!modal) return;

        // Set modal content
        document.getElementById('copingExerciseTitle').textContent = skill.name;
        document.getElementById('copingExerciseDescription').textContent = skill.description;

        // Set exercise details
        const detailsHtml = `
            <div class="row g-3 mb-3">
                <div class="col-md-6">
                    <small class="text-muted d-block">Duration</small>
                    <strong>${skill.duration} seconds (${Math.round(skill.duration / 60)} min)</strong>
                </div>
                <div class="col-md-6">
                    <small class="text-muted d-block">Difficulty</small>
                    <strong>${skill.difficulty}</strong>
                </div>
                <div class="col-md-6">
                    <small class="text-muted d-block">Category</small>
                    <strong>${skill.category}</strong>
                </div>
                <div class="col-md-6">
                    <small class="text-muted d-block">Best for</small>
                    <strong>${skill.for_conditions.join(', ')}</strong>
                </div>
            </div>
        `;
        document.getElementById('copingExerciseDetails').innerHTML = detailsHtml;

        // Set benefits
        const benefitsHtml = `
            <div class="mb-3">
                <h6 class="mb-2">Benefits</h6>
                <ul class="list-unstyled">
                    ${skill.benefits.map(b => `<li class="mb-1">✓ ${b}</li>`).join('')}
                </ul>
            </div>
        `;
        document.getElementById('copingExerciseBenefits').innerHTML = benefitsHtml;

        // Set steps preview
        const stepsHtml = `
            <div class="mb-3">
                <h6 class="mb-2">Steps</h6>
                <ol class="small">
                    ${skill.steps.map(step => `
                        <li class="mb-2">
                            <strong>${step.instruction}</strong>
                            <br><small class="text-muted">${step.duration}s</small>
                        </li>
                    `).join('')}
                </ol>
            </div>
        `;
        document.getElementById('copingExerciseSteps').innerHTML = stepsHtml;

        // Update favorite button
        const favBtn = document.getElementById('copingToggleFavoriteBtn');
        if (favBtn) {
            favBtn.textContent = copingHandler.isFavorite(id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites';
        }

        // Show modal
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }

    // Start exercise
    startExercise() {
        const skill = copingHandler.getSkillById(this.currentExerciseId);
        if (!skill) return;

        // Close detail modal and show timer modal
        const detailModal = bootstrap.Modal.getInstance(document.getElementById('copingExerciseModal'));
        if (detailModal) detailModal.hide();

        // Prepare and show timer modal
        this.prepareTimerModal(skill);
        const timerModal = new bootstrap.Modal(document.getElementById('copingTimerModal'));
        timerModal.show();

        // Start timer
        this.runExercise(skill);
    }

    // Prepare timer modal
    prepareTimerModal(skill) {
        document.getElementById('copingTimerTitle').textContent = skill.name;
        document.getElementById('copingTimerContainer').innerHTML = `
            <div class="text-center">
                <div id="copingBreathingCircle" style="display: none;">
                    <svg width="200" height="200" viewBox="0 0 200 200" style="margin: 20px auto; display: block;">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#3498db" stroke-width="2" id="breathingBase"/>
                        <circle cx="100" cy="100" r="60" fill="rgba(52, 152, 219, 0.1)" id="breathingCircle"/>
                        <text x="100" y="105" text-anchor="middle" font-size="20" fill="#2c3e50" id="breathingPhase" font-weight="bold">Inhale</text>
                        <text x="100" y="135" text-anchor="middle" font-size="16" fill="#7f8c8d" id="breathingTime">4s</text>
                    </svg>
                </div>
                <div id="copingProgressBar" style="display: none;">
                    <div class="progress" style="height: 30px; margin: 20px 0;">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" id="copingProgressFill" style="width: 0%"></div>
                    </div>
                    <p id="copingProgressText" class="text-muted">Starting...</p>
                </div>
                <div id="copingCountdown" style="display: none;">
                    <h1 style="font-size: 80px; color: #3498db; margin: 20px 0;" id="copingCountdownNumber">0</h1>
                    <p class="text-muted" id="copingCountdownText">Seconds</p>
                </div>
                <p class="mt-4" id="copingStepText" style="font-size: 18px; min-height: 30px;"></p>
            </div>
        `;

        // Show appropriate timer visual
        if (skill.timer_visual === 'breathing_circle') {
            document.getElementById('copingBreathingCircle').style.display = 'block';
        } else if (skill.timer_visual === 'progress_bar') {
            document.getElementById('copingProgressBar').style.display = 'block';
        } else if (skill.timer_visual === 'countdown') {
            document.getElementById('copingCountdown').style.display = 'block';
        }
    }

    // Run exercise
    runExercise(skill) {
        this.isRunning = true;
        this.currentStep = 0;
        let elapsedTime = 0;
        const totalDuration = skill.duration;

        // Start timer
        this.timerInterval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(this.timerInterval);
                return;
            }

            elapsedTime++;

            // Update display
            this.updateTimerDisplay(skill, elapsedTime, totalDuration);

            // Check if exercise is complete
            if (elapsedTime >= totalDuration) {
                clearInterval(this.timerInterval);
                this.isRunning = false;
                this.completeExercise(skill);
            }
        }, 1000);

        // Initial display
        this.updateTimerDisplay(skill, elapsedTime, totalDuration);
    }

    // Update timer display
    updateTimerDisplay(skill, elapsedTime, totalDuration) {
        const percentComplete = (elapsedTime / totalDuration) * 100;
        const timeRemaining = totalDuration - elapsedTime;

        if (skill.timer_visual === 'breathing_circle') {
            this.updateBreathingCircle(skill, elapsedTime, percentComplete);
        } else if (skill.timer_visual === 'progress_bar') {
            this.updateProgressBar(percentComplete, timeRemaining, skill);
        } else if (skill.timer_visual === 'countdown') {
            this.updateCountdown(timeRemaining);
        }
    }

    // Update breathing circle
    updateBreathingCircle(skill, elapsedTime, percentComplete) {
        // Calculate current step in breathing cycle
        const cycleLength = skill.steps.reduce((sum, s) => sum + s.duration, 0);
        const positionInCycle = elapsedTime % cycleLength;

        let currentPhase = '';
        let phaseRemaining = 0;
        let phaseElapsed = 0;

        for (let step of skill.steps) {
            if (positionInCycle < phaseElapsed + step.duration) {
                currentPhase = step.phase;
                phaseRemaining = step.duration - (positionInCycle - phaseElapsed);
                break;
            }
            phaseElapsed += step.duration;
        }

        // Update circle appearance based on phase
        const circle = document.getElementById('breathingCircle');
        const phaseText = document.getElementById('breathingPhase');
        const timeText = document.getElementById('breathingTime');

        // Map phases to visual feedback
        const phaseMap = {
            'inhale': { fill: 'rgba(52, 152, 219, 0.3)', r: 80 },
            'exhale': { fill: 'rgba(52, 152, 219, 0.05)', r: 40 },
            'hold': { fill: 'rgba(52, 152, 219, 0.1)', r: 60 }
        };

        const phaseStyle = phaseMap[currentPhase] || phaseMap['inhale'];
        if (circle) {
            circle.setAttribute('fill', phaseStyle.fill);
            circle.setAttribute('r', phaseStyle.r);
        }

        // Update text
        if (phaseText) {
            const phaseDisplay = {
                'inhale': 'Inhale',
                'exhale': 'Exhale',
                'hold': 'Hold'
            };
            phaseText.textContent = phaseDisplay[currentPhase] || 'Breathe';
        }

        if (timeText) {
            timeText.textContent = Math.ceil(phaseRemaining) + 's';
        }
    }

    // Update progress bar
    updateProgressBar(percentComplete, timeRemaining, skill) {
        const bar = document.getElementById('copingProgressFill');
        if (bar) {
            bar.style.width = percentComplete + '%';
        }

        const text = document.getElementById('copingProgressText');
        if (text) {
            text.textContent = `${Math.ceil(timeRemaining)}s remaining`;
        }
    }

    // Update countdown
    updateCountdown(timeRemaining) {
        const number = document.getElementById('copingCountdownNumber');
        if (number) {
            number.textContent = Math.ceil(timeRemaining);
        }
    }

    // Complete exercise
    completeExercise(skill) {
        // Log completion
        copingHandler.logExerciseCompletion(skill.id);

        // Hide timer modal
        const timerModal = bootstrap.Modal.getInstance(document.getElementById('copingTimerModal'));
        if (timerModal) timerModal.hide();

        // Show completion modal
        this.showCompletionModal(skill);
    }

    // Show completion modal
    showCompletionModal(skill) {
        const stats = copingHandler.getExerciseStats();
        const completionModal = document.getElementById('copingCompletionModal');

        if (!completionModal) return;

        const html = `
            <div class="text-center">
                <div style="font-size: 60px; margin-bottom: 20px;">🎉</div>
                <h5 class="mb-3">Excellent Work!</h5>
                <p class="text-muted mb-4">You completed <strong>${skill.name}</strong></p>

                <div class="alert alert-info mb-4">
                    <p class="mb-0"><strong>💪 You've completed ${stats.totalCompleted} exercises this month!</strong></p>
                    <p class="mb-0 small text-muted mt-2">Keep going - consistency is key!</p>
                </div>

                <div class="mb-4 p-3 bg-light rounded">
                    <p class="mb-2"><strong>Key Benefits of ${skill.name}:</strong></p>
                    <ul class="list-unstyled small">
                        ${skill.benefits.slice(0, 3).map(b => `<li>✓ ${b}</li>`).join('')}
                    </ul>
                </div>

                <div class="mb-4">
                    <p><strong>How did that feel?</strong></p>
                    <div class="d-flex gap-2 justify-content-center flex-wrap">
                        <button class="btn btn-sm btn-outline-primary" onclick="copingUI.rateExercise(1)">😞 Tough</button>
                        <button class="btn btn-sm btn-outline-primary" onclick="copingUI.rateExercise(2)">😐 Okay</button>
                        <button class="btn btn-sm btn-outline-primary" onclick="copingUI.rateExercise(3)">😊 Good</button>
                        <button class="btn btn-sm btn-outline-primary" onclick="copingUI.rateExercise(4)">🤩 Great</button>
                    </div>
                </div>

                ${stats.streak > 0 ? `
                    <div class="alert alert-success mb-4">
                        <p class="mb-0"><strong>🔥 Streak: ${stats.streak} exercise${stats.streak > 1 ? 's' : ''} in a row!</strong></p>
                    </div>
                ` : ''}
            </div>
        `;

        document.getElementById('copingCompletionBody').innerHTML = html;

        const bsModal = new bootstrap.Modal(completionModal);
        bsModal.show();
    }

    // Rate exercise (callback)
    rateExercise(rating) {
        const modal = bootstrap.Modal.getInstance(document.getElementById('copingCompletionModal'));
        if (modal) modal.hide();
    }

    // Cancel exercise
    cancelExercise() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.isRunning = false;

        const modal = bootstrap.Modal.getInstance(document.getElementById('copingTimerModal'));
        if (modal) modal.hide();
    }

    // Toggle favorite
    toggleFavorite(id) {
        if (copingHandler.isFavorite(id)) {
            copingHandler.removeFavorite(id);
        } else {
            copingHandler.addFavorite(id);
        }

        // Update button in modal if open
        const favBtn = document.getElementById('copingToggleFavoriteBtn');
        if (favBtn && this.currentExerciseId === id) {
            favBtn.textContent = copingHandler.isFavorite(id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites';
        }

        // Update grid display
        this.renderSkillsGrid(copingHandler.getCopingSkills());
    }

    // Filter and display functions
    onCategoryChange() {
        const category = document.getElementById('copingCategorySelect').value;
        const skills = category ? copingHandler.getByCategory(category) : copingHandler.getCopingSkills();
        this.renderSkillsGrid(skills);
    }

    onDifficultyChange() {
        const difficulty = document.getElementById('copingDifficultySelect').value;
        const skills = difficulty ? copingHandler.getByDifficulty(difficulty) : copingHandler.getCopingSkills();
        this.renderSkillsGrid(skills);
    }

    onConditionChange() {
        const condition = document.getElementById('copingConditionSelect').value;
        const skills = condition ? copingHandler.getByCondition(condition) : copingHandler.getCopingSkills();
        this.renderSkillsGrid(skills);
    }

    onSearch() {
        const query = document.getElementById('copingSearchInput').value.toLowerCase();
        const filtered = copingHandler.getCopingSkills().filter(skill =>
            skill.name.toLowerCase().includes(query) ||
            skill.description.toLowerCase().includes(query) ||
            skill.benefits.some(b => b.toLowerCase().includes(query))
        );
        this.renderSkillsGrid(filtered);
    }

    // Render statistics
    renderStats() {
        const statsContainer = document.getElementById('copingStatsContainer');
        if (!statsContainer) return;

        const stats = copingHandler.getExerciseStats();

        const html = `
            <div class="row g-4">
                <!-- Quick Stats -->
                <div class="col-md-6 col-lg-3">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body text-center">
                            <div style="font-size: 40px; margin-bottom: 10px;">💪</div>
                            <p class="text-muted mb-1">Exercises Completed</p>
                            <h3>${stats.totalCompleted}</h3>
                            <small class="text-muted">Last 30 days</small>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body text-center">
                            <div style="font-size: 40px; margin-bottom: 10px;">🎯</div>
                            <p class="text-muted mb-1">Unique Exercises</p>
                            <h3>${stats.uniqueExercises}</h3>
                            <small class="text-muted">Different coping skills</small>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body text-center">
                            <div style="font-size: 40px; margin-bottom: 10px;">🔥</div>
                            <p class="text-muted mb-1">Current Streak</p>
                            <h3>${stats.streak}</h3>
                            <small class="text-muted">Days in a row</small>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body text-center">
                            <div style="font-size: 40px; margin-bottom: 10px;">🏆</div>
                            <p class="text-muted mb-1">Category</p>
                            <h3>${Object.keys(stats.categoryBreakdown).length}</h3>
                            <small class="text-muted">Categories tried</small>
                        </div>
                    </div>
                </div>

                <!-- Category Breakdown -->
                <div class="col-lg-6">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">Exercises by Category</h5>
                            <div class="list-group list-group-flush">
                                ${Object.entries(stats.categoryBreakdown).map(([category, count]) => `
                                    <div class="list-group-item d-flex justify-content-between align-items-center">
                                        <span>${category}</span>
                                        <span class="badge bg-info rounded-pill">${count}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Most Used Exercises -->
                <div class="col-lg-6">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">Your Favorites (Most Used)</h5>
                            ${stats.mostUsed.length > 0 ? `
                                <div class="list-group list-group-flush">
                                    ${stats.mostUsed.map((item, idx) => `
                                        <div class="list-group-item d-flex justify-content-between align-items-center">
                                            <span>${idx + 1}. ${item.skill.name}</span>
                                            <span class="badge bg-success rounded-pill">${item.count}x</span>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <p class="text-muted text-center py-4">Start an exercise to see your stats!</p>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;

        statsContainer.innerHTML = html;
    }
}

// Initialize UI
const copingUI = new CopingUI();
