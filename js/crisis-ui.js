// Crisis Resources UI Handler
class CrisisUI {
    constructor() {
        this.modal = null;
    }

    init() {
        this.setupBanner();
        this.setupDashboardCard();
        this.setupModal();
        this.setupNavbarButton();
        this.setupTabContent();
        this.attachFooter();
    }

    attachFooter() {
        setTimeout(() => {
            const pane = document.getElementById('crisisResourcesContent');
            if (pane && !pane.querySelector('.source-footer')) {
                const currentPersona = window.personaHandler ? window.personaHandler.getPersona() : 'teen';
                const tabId = currentPersona === 'parent' ? 'parentSourcesTab' : 'teenSourcesTab';
                const footer = FooterHelper.getSourceFooter(tabId);
                const wrapper = document.createElement('div');
                wrapper.innerHTML = footer;
                wrapper.classList.add('source-footer');
                pane.appendChild(wrapper);
            }
        }, 100);
    }

    setupBanner() {
        // Crisis banner is shown/hidden via CSS and can be dismissed
        const banner = document.getElementById('crisisBanner');
        if (banner) {
            // Ensure banner is visible on page load
            banner.style.display = 'block';
        }
    }

    setupNavbarButton() {
        // Crisis help is now accessed via the Crisis Resources tab
        // The navbar button has been removed in favor of the dedicated tab
    }

    setupDashboardCard() {
        this.updateByState('');
    }

    updateByState(state) {
        const container = document.getElementById('crisisDashboardCard');
        if (!container) return;

        const emergencyResources = crisisHandler.getEmergencyResources();
        const stateResources = crisisHandler.getByState(state);

        let html = `
            <div class="card border-0 shadow-sm crisis-card">
                <div class="card-body">
                    <h5 class="card-title mb-4">
                        <span class="text-danger">🆘</span> Crisis Support Available 24/7
        `;

        if (state && state !== '') {
            html += ` <span class="badge bg-info ms-2">${state}</span>`;
        }

        html += `
                    </h5>
                    <div class="row g-3">
        `;

        emergencyResources.forEach(resource => {
            html += `
                <div class="col-md-6">
                    <div class="card border-1 border-${resource.color} h-100">
                        <div class="card-body">
                            <h6 class="card-title text-${resource.color}">
                                ${resource.icon} ${resource.name}
                            </h6>
                            <p class="card-text small mb-3">${resource.description}</p>
                            <div class="mb-2">
                ${resource.methods.map(method => `
                                <div class="mb-2">
                                    <strong>${method.icon} ${method.type}:</strong>
                                    <span class="font-monospace text-dark">${method.value}</span>
                                </div>
                            `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Add state-specific resources if available
        if (stateResources.length > 0) {
            html += `
                    </div>
                    <div class="mt-4 pt-3 border-top">
                        <h6 class="text-info mb-3">📍 ${state} Local Resources</h6>
                        <div class="row g-3">
            `;

            stateResources.forEach(resource => {
                html += `
                    <div class="col-md-6">
                        <div class="card border-1 border-info h-100 bg-light">
                            <div class="card-body">
                                <h6 class="card-title text-info">
                                    📍 ${resource.name}
                                </h6>
                                <p class="card-text small mb-2">${resource.description}</p>
                                <div class="mb-2">
                                    <strong>📞 Phone:</strong>
                                    <span class="font-monospace text-dark">${resource.phone}</span>
                                </div>
                                ${resource.website ? `
                                    <div class="mb-0">
                                        <strong>🌐 Website:</strong>
                                        <a href="${resource.website}" target="_blank" class="text-decoration-none">
                                            ${new URL(resource.website).hostname}
                                        </a>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `
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

    setupModal() {
        const modalElement = document.getElementById('crisisModal');
        if (modalElement) {
            this.modal = new bootstrap.Modal(modalElement);
        }
    }

    setupTabContent() {
        const container = document.getElementById('crisisResourcesContainer');
        if (!container) return;

        const resources = crisisHandler.getAllResources();

        let html = '';
        resources.forEach(resource => {
            html += `
                <div class="col-lg-6">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <h5 class="card-title mb-2">
                                <span class="fs-4">${resource.icon}</span> ${resource.name}
                            </h5>
                            <p class="text-muted mb-3 small">${resource.description}</p>
                            <p class="mb-3">${resource.fullDescription}</p>

                            <div class="mb-3">
                                <strong class="d-block mb-2">How to reach:</strong>
                                <div class="list-group list-group-sm">
                                    ${resource.methods.map(method => `
                                        <div class="list-group-item border-0 px-0 py-2 bg-transparent">
                                            <span class="me-2">${method.icon}</span>
                                            <strong>${method.type}:</strong>
                                            ${method.url ? `
                                                <a href="${method.url}" target="_blank" class="ms-1 text-decoration-none">
                                                    ${method.value}
                                                </a>
                                            ` : `
                                                <span class="ms-1 font-monospace fw-bold">${method.value}</span>
                                            `}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div>
                                <strong class="d-block mb-1">Best for:</strong>
                                <p class="text-muted small mb-0">${resource.bestFor}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    showCrisisModal(state = '') {
        if (!this.modal) {
            console.error('Crisis modal not initialized');
            return;
        }

        const modalBody = document.getElementById('crisisModalBody');
        const resources = crisisHandler.getAllResources();
        const stateResources = crisisHandler.getByState(state);

        let html = '<div class="crisis-modal-content">';

        // National resources section
        html += '<h5 class="mb-4">🆘 National Crisis Resources</h5>';

        resources.forEach((resource, index) => {
            html += `
                <div class="crisis-resource-item mb-4 ${index > 0 ? 'border-top pt-4' : ''}">
                    <h6 class="mb-3 text-${resource.color}">
                        <span class="fs-5">${resource.icon}</span> ${resource.name}
                    </h6>
                    <p class="text-muted mb-3">${resource.fullDescription}</p>

                    <div class="mb-3">
                        <strong class="d-block mb-2">How to reach:</strong>
                        <div class="list-group list-group-flush">
            `;

            resource.methods.forEach(method => {
                if (method.url) {
                    html += `
                        <div class="list-group-item px-0 py-2">
                            <span class="me-2">${method.icon}</span>
                            <strong>${method.type}:</strong>
                            <a href="${method.url}" target="_blank" class="text-decoration-none">
                                ${method.value}
                            </a>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="list-group-item px-0 py-2">
                            <span class="me-2">${method.icon}</span>
                            <strong>${method.type}:</strong>
                            <span class="font-monospace">${method.value}</span>
                        </div>
                    `;
                }
            });

            html += `
                        </div>
                    </div>

                    <div class="mb-3">
                        <strong class="d-block mb-2">Best for:</strong>
                        <p class="text-muted mb-0">${resource.bestFor}</p>
                    </div>
                </div>
            `;
        });

        // State resources section
        if (stateResources.length > 0) {
            html += `
                <div class="mt-5 pt-4 border-top">
                    <h5 class="mb-4">📍 ${state} Local Resources</h5>
            `;

            stateResources.forEach((resource, index) => {
                html += `
                    <div class="crisis-resource-item mb-4 ${index > 0 ? 'border-top pt-4' : ''}">
                        <h6 class="mb-3 text-info">
                            <span class="fs-5">📍</span> ${resource.name}
                        </h6>
                        <p class="text-muted mb-3">${resource.description}</p>

                        <div class="mb-3">
                            <strong class="d-block mb-2">Contact Information:</strong>
                            <div class="list-group list-group-flush">
                                <div class="list-group-item px-0 py-2">
                                    <span class="me-2">📞</span>
                                    <strong>Phone:</strong>
                                    <span class="font-monospace">${resource.phone}</span>
                                </div>
                                ${resource.website ? `
                                    <div class="list-group-item px-0 py-2">
                                        <span class="me-2">🌐</span>
                                        <strong>Website:</strong>
                                        <a href="${resource.website}" target="_blank" class="text-decoration-none">
                                            ${new URL(resource.website).hostname}
                                        </a>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });

            html += `
                </div>
            `;
        }

        html += `
            <div class="alert alert-info mt-5 mb-0">
                <strong>Remember:</strong> Seeking help is a sign of strength, not weakness.
                You deserve support, and there are people ready to listen 24/7.
            </div>
        </div>
        `;

        modalBody.innerHTML = html;
        this.modal.show();
    }

    showEmergencyBanner() {
        // This could be used to show an extra urgent banner if needed
        const banner = document.getElementById('crisisBanner');
        if (banner) {
            banner.classList.add('show');
        }
    }
}

// Create global instance
const crisisUI = new CrisisUI();
