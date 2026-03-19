// Parent Guidance UI Handler
class ParentUI {
    constructor() {
        this.currentSection = 'understanding';
    }

    async init() {
        await parentHandler.loadGuidance();
        this.setupNavigation();
        this.renderSectionList();
        this.displaySection('understanding');
    }

    setupNavigation() {
        // Section navigation
        const sectionButtons = document.querySelectorAll('[data-parent-section]');
        sectionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = btn.getAttribute('data-parent-section');
                this.displaySection(sectionId);
            });
        });

        // Next/Previous buttons
        const nextBtn = document.getElementById('parentNextBtn');
        const prevBtn = document.getElementById('parentPrevBtn');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const nextSection = parentHandler.getNextSection(this.currentSection);
                if (nextSection) {
                    this.displaySection(nextSection.id);
                    document.getElementById('parentSectionNav').scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const prevSection = parentHandler.getPreviousSection(this.currentSection);
                if (prevSection) {
                    this.displaySection(prevSection.id);
                    document.getElementById('parentSectionNav').scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    renderSectionList() {
        const container = document.getElementById('parentSectionList');
        if (!container) return;

        const sections = parentHandler.getAllSections();
        let html = '<div class="row g-2">';

        sections.forEach(section => {
            html += `
                <div class="col-md-6 col-lg-4">
                    <button class="btn btn-outline-secondary w-100 text-start p-3 parent-section-btn"
                            data-parent-section="${section.id}"
                            style="height: 100%; border-radius: 8px; transition: all 0.2s ease;">
                        <span style="font-size: 1.5rem;">${section.icon}</span>
                        <div class="fw-bold mt-2">${section.title}</div>
                    </button>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;

        // Re-attach event listeners after rendering
        this.setupNavigation();
    }

    displaySection(sectionId) {
        const section = parentHandler.getSection(sectionId);
        if (!section) return;

        this.currentSection = sectionId;
        parentHandler.markSectionViewed(sectionId);

        const container = document.getElementById('parentSectionContent');
        if (!container) return;

        let html = `
            <div id="parentSectionNav">
                <div class="d-flex align-items-center gap-2 mb-4">
                    <span style="font-size: 2rem;">${section.icon}</span>
                    <div>
                        <h2 class="mb-1">${section.title}</h2>
                        <small class="text-muted">Section ${this.getSectionNumber(sectionId) + 1} of ${parentHandler.getAllSections().length}</small>
                    </div>
                </div>

                <div class="progress mb-4" style="height: 8px;">
                    <div class="progress-bar" role="progressbar"
                         style="width: ${((this.getSectionNumber(sectionId) + 1) / parentHandler.getAllSections().length) * 100}%"
                         aria-valuenow="${this.getSectionNumber(sectionId) + 1}"
                         aria-valuemin="0"
                         aria-valuemax="${parentHandler.getAllSections().length}">
                    </div>
                </div>
            </div>

            <div class="parent-section-body">
                ${this.renderContent(section.content)}
            </div>

            ${section.subsections ? `
                <div class="mt-5 pt-4 border-top">
                    <h4 class="mb-4">📌 Key Details</h4>
                    <div class="row g-3">
                        ${section.subsections.map(sub => `
                            <div class="col-lg-6">
                                <div class="card border-0 bg-light h-100">
                                    <div class="card-body">
                                        <h5 class="card-title">${sub.title}</h5>
                                        <p class="card-text">${sub.content}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="mt-5 pt-4 border-top">
                <div class="d-flex gap-2 justify-content-between">
                    <button class="btn btn-outline-secondary" id="parentPrevBtn"
                            ${this.getSectionNumber(sectionId) === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    <button class="btn btn-outline-secondary" id="parentNextBtn"
                            ${this.getSectionNumber(sectionId) === parentHandler.getAllSections().length - 1 ? 'disabled' : ''}>
                        Next →
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.setupNavigation();
    }

    renderContent(content) {
        let html = `
            <p class="lead text-muted mb-4">${content.overview || ''}</p>
        `;

        // Handle stats
        if (content.stats) {
            html += `
                <div class="alert alert-info mb-4">
                    <h5 class="mb-3">📊 Key Statistics</h5>
                    <ul class="mb-0">
                        ${content.stats.map(stat => `<li>${stat}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Handle normal_vs_concerning
        if (content.normal_vs_concerning) {
            html += `
                <div class="mb-4">
                    <h5 class="mb-3">📌 Normal vs. Concerning</h5>
                    <div class="row g-3">
                        ${Object.entries(content.normal_vs_concerning).map(([key, value]) => `
                            <div class="col-lg-6">
                                <div class="card border-0 shadow-sm h-100">
                                    <div class="card-body">
                                        <h6 class="card-title text-capitalize mb-3">${this.formatKey(key)}</h6>
                                        <div class="mb-3">
                                            <span class="badge bg-success mb-2">Normal</span>
                                            <p class="mb-0">${value.normal}</p>
                                        </div>
                                        <hr>
                                        <div>
                                            <span class="badge bg-danger mb-2">Concerning</span>
                                            <p class="mb-0">${value.concerning}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Handle brain development context
        if (content.brain_development_context) {
            html += `
                <div class="alert alert-warning mb-4">
                    <strong>🧠 Brain Development Context</strong>
                    <p class="mb-0 mt-2">${content.brain_development_context}</p>
                </div>
            `;
        }

        // Handle framework
        if (content.framework) {
            html += `
                <div class="mb-4">
                    <h5 class="mb-3">The 4-Step Emotion Coaching Framework</h5>
                    ${Object.entries(content.framework).map(([key, step]) => `
                        <div class="card mb-3 border-0 shadow-sm">
                            <div class="card-header bg-primary text-white">
                                <strong>${step.name}</strong>
                            </div>
                            <div class="card-body">
                                <p>${step.description}</p>
                                ${step.tips ? `
                                    <div class="mb-3">
                                        <strong class="d-block mb-2">💡 Tips:</strong>
                                        <ul class="mb-0">
                                            ${step.tips.map(t => `<li>${t}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                ${step.what_to_say ? `
                                    <div class="mb-3">
                                        <strong class="d-block mb-2 text-success">✓ What to Say:</strong>
                                        <ul class="mb-0">
                                            ${step.what_to_say.map(t => `<li><em>${t}</em></li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                ${step.what_NOT_to_say ? `
                                    <div class="mb-3">
                                        <strong class="d-block mb-2 text-danger">✗ What NOT to Say:</strong>
                                        <ul class="mb-0">
                                            ${step.what_NOT_to_say.map(t => `<li>${t}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                ${step.key ? `
                                    <div class="alert alert-info mb-0">
                                        <strong>Key Takeaway:</strong> ${step.key}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Handle immediate_crisis
        if (content.immediate_crisis) {
            html += `
                <div class="alert alert-danger mb-4">
                    <h5 class="mb-3">🚨 IMMEDIATE CRISIS - Call 988 or 911</h5>
                    <ul class="mb-0">
                        ${content.immediate_crisis.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Handle strategies
        if (content.strategies) {
            html += `
                <div class="mb-4">
                    ${content.strategies.map(strategy => `
                        <div class="card mb-3 border-0 shadow-sm">
                            <div class="card-body">
                                <h6 class="card-title">${strategy.name}</h6>
                                <p class="text-muted mb-2"><strong>Why:</strong> ${strategy.why}</p>
                                <div class="mb-3">
                                    <strong class="d-block mb-2">What to do:</strong>
                                    <ul class="mb-0">
                                        ${strategy.what_to_do.map(item => `<li>${item}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="alert alert-light">
                                    <strong>💬 How to approach:</strong> ${strategy.how_to_approach}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Handle mistakes
        if (content.mistakes) {
            html += `
                <div class="mb-4">
                    ${content.mistakes.map(mistake => `
                        <div class="card mb-3 border-0 border-start border-danger shadow-sm">
                            <div class="card-body">
                                <h6 class="card-title text-danger">❌ ${mistake.mistake}</h6>
                                <p class="mb-2"><strong>Why it backfires:</strong> ${mistake.why_it_backfires}</p>
                                <div class="alert alert-success mb-0">
                                    <strong>✓ Instead:</strong> ${mistake.instead}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Handle conditions
        if (content.conditions) {
            html += `
                <div class="mb-4">
                    ${content.conditions.map(condition => `
                        <div class="card mb-3 border-0 shadow-sm">
                            <div class="card-header bg-light">
                                <strong>${condition.name}</strong>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <strong class="text-success d-block mb-2">✓ What Helps:</strong>
                                    <ul class="mb-0">
                                        ${condition.what_helps.map(item => `<li>${item}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="mb-3">
                                    <strong class="text-danger d-block mb-2">✗ What Hurts:</strong>
                                    <ul class="mb-0">
                                        ${condition.what_hurts.map(item => `<li>${item}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="alert alert-info mb-0">
                                    <strong>💙 Parent Self-Care:</strong> ${condition.parent_self_care}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Handle priorities
        if (content.priorities) {
            html += `
                <div class="mb-4">
                    ${content.priorities.map(priority => `
                        <div class="card mb-3 border-0 shadow-sm">
                            <div class="card-body">
                                <h6 class="card-title">${priority.item}</h6>
                                <p class="text-muted mb-2">${priority.why}</p>
                                <div class="alert alert-light mb-0">
                                    <strong>Action:</strong> ${priority.action}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Handle permission_to_rest
        if (content.permission_to_rest) {
            html += `
                <div class="alert alert-success mb-0">
                    <h5 class="mb-3">💚 Permission to Rest</h5>
                    <p class="mb-0">${content.permission_to_rest}</p>
                </div>
            `;
        }

        // Handle resources (crisis, organizations, books, podcasts)
        if (content.crisis || content.organizations || content.books || content.podcasts) {
            html += '<h5 class="mt-5 mb-3">📚 Resources</h5>';

            if (content.crisis) {
                html += `
                    <h6 class="mb-3 text-danger">🚨 Crisis Resources</h6>
                    <div class="row g-3 mb-4">
                        ${content.crisis.map(resource => `
                            <div class="col-md-6">
                                <div class="card border-0 shadow-sm h-100">
                                    <div class="card-body">
                                        <h6 class="card-title">${resource.name}</h6>
                                        <p class="mb-2"><strong>${resource.contact}</strong></p>
                                        <p class="text-muted mb-2"><em>${resource.availability}</em></p>
                                        <p class="mb-0"><small>${resource.for_what}</small></p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            if (content.organizations) {
                html += `
                    <h6 class="mb-3">🏢 Organizations</h6>
                    <div class="row g-3 mb-4">
                        ${content.organizations.map(org => `
                            <div class="col-md-6">
                                <div class="card border-0 shadow-sm h-100">
                                    <div class="card-body">
                                        <h6 class="card-title">${org.name}</h6>
                                        <p class="mb-2"><a href="${org.website}" target="_blank" class="text-decoration-none">${org.website}</a></p>
                                        <p class="mb-0"><small>${org.offers}</small></p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            if (content.books) {
                html += `
                    <h6 class="mb-3">📖 Recommended Books</h6>
                    <div class="list-group mb-4">
                        ${content.books.map(book => `
                            <div class="list-group-item border-0 bg-light mb-2 p-3" style="border-radius: 6px;">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 class="mb-1">${book.title}</h6>
                                        <p class="text-muted mb-1"><em>by ${book.author}</em></p>
                                        <p class="mb-0"><small>${book.why}</small></p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            if (content.podcasts) {
                html += `
                    <h6 class="mb-3">🎧 Podcasts</h6>
                    <div class="list-group">
                        ${content.podcasts.map(podcast => `
                            <div class="list-group-item border-0 bg-light mb-2 p-3" style="border-radius: 6px;">
                                <div>
                                    <h6 class="mb-1">${podcast.name}</h6>
                                    <p class="text-muted mb-1"><em>${podcast.topic}</em></p>
                                    <p class="mb-0"><small>${podcast.why}</small></p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        }

        return html;
    }

    getSectionNumber(sectionId) {
        return parentHandler.getAllSections().findIndex(s => s.id === sectionId);
    }

    formatKey(key) {
        return key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}

// Create global instance
const parentUI = new ParentUI();
