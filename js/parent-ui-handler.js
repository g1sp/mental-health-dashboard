// Parent UI Handler - Renders parent-specific content

class ParentUIHandler {
  constructor() {
    this.currentImplementationGuide = null;
  }

  init() {
    this.renderWeeklyPlaybook();
  }

  renderWeeklyPlaybook() {
    const playbook = parentImplementationHandler.getWeeklyPlaybook();
    const container = document.getElementById('weeklyPlaybookContainer');

    if (!container) return;

    container.innerHTML = playbook.map((week, idx) => `
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header ${idx % 3 === 0 ? 'bg-danger' : idx % 3 === 1 ? 'bg-warning' : 'bg-success'} text-white">
            <h5 class="mb-0">Week ${week.week}: ${week.title}</h5>
          </div>
          <div class="card-body">
            <h6 class="mb-2">👤 Your Action:</h6>
            <p class="small mb-3">${week.parentAction}</p>

            <h6 class="mb-2">👧 Their Action:</h6>
            <p class="small mb-3">${week.teenAction}</p>

            <h6 class="mb-2">👥 Together:</h6>
            <p class="small mb-0">${week.together}</p>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// Render implementation guide
function showImplementationGuide(key) {
  const html = parentImplementationHandler.showImplementationUI(key);
  document.getElementById('implementationGuideContainer').innerHTML = html;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  const parentUIHandler = new ParentUIHandler();
  parentUIHandler.init();
  window.parentUIHandler = parentUIHandler;
});
