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
        const crisisBtn = document.getElementById('crisisHelpBtn');
        if (crisisBtn) {
            crisisBtn.addEventListener('click', () => {
                this.showCrisisModal();
            });
        }
    }

    setupDashboardCard() {
        const container = document.getElementById('crisisDashboardCard');
        if (!container) return;

        const resources = crisisHandler.getAll();
        const emergencyResources = crisisHandler.getEmergencyResources();

        let html = `
            <div class="card border-0 shadow-sm crisis-card">
                <div class="card-body">
                    <h5 class="card-title mb-4">
                        <span class="text-danger">🆘</span> Crisis Support Available 24/7
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

        html += `
                    </div>
                    <div class="mt-3 text-center">
                        <button type="button" class="btn btn-outline-secondary btn-sm" id="viewAllCrisisResources">
                            View All Resources →
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Add event listener for "View All" button
        document.getElementById('viewAllCrisisResources')?.addEventListener('click', () => {
            this.showCrisisModal();
        });
    }

    setupModal() {
        const modalElement = document.getElementById('crisisModal');
        if (modalElement) {
            this.modal = new bootstrap.Modal(modalElement);
        }
    }

    showCrisisModal() {
        if (!this.modal) {
            console.error('Crisis modal not initialized');
            return;
        }

        const modalBody = document.getElementById('crisisModalBody');
        const resources = crisisHandler.getAllResources();

        let html = '<div class="crisis-modal-content">';

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

        html += `
            <div class="alert alert-info mt-4 mb-0">
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
