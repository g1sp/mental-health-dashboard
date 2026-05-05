class UnderstandingHandler {
  constructor() {
    this.currentTab = 'Data';
  }

  init() {
    const tabButtons = document.querySelectorAll('.understanding-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    this.embedContent();
    this.switchTab('Data');
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    document.querySelectorAll('.understanding-tab-content').forEach(el => {
      el.style.display = 'none';
    });

    document.querySelectorAll('.understanding-tab-btn').forEach(el => {
      el.classList.remove('active');
    });

    const contentId = `understanding${tabName}`;
    const content = document.getElementById(contentId);
    if (content) {
      content.style.display = '';
    }

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  }

  embedContent() {
    this.embedDashboardContent();
    this.embedRootCausesContent();
    this.embedRiskFactorsContent();
  }

  embedDashboardContent() {
    const container = document.getElementById('dashboardEmbedded');
    if (!container) return;

    const dashboardContent = document.getElementById('dashboardContent');
    if (dashboardContent) {
      container.innerHTML = dashboardContent.innerHTML;
      this.reinitializeDashboardHandlers();
    }
  }

  embedRootCausesContent() {
    const container = document.getElementById('whyStruggleEmbedded');
    if (!container) return;

    const whyStruggleContent = document.getElementById('whyStruggleContent');
    if (whyStruggleContent) {
      container.innerHTML = whyStruggleContent.innerHTML;
      this.reinitializeWhyStruggleHandlers();
    }
  }

  embedRiskFactorsContent() {
    const container = document.getElementById('riskFactorsEmbedded');
    if (!container) return;

    const riskFactorsContent = document.getElementById('riskFactorsContent');
    if (riskFactorsContent) {
      container.innerHTML = riskFactorsContent.innerHTML;
      this.reinitializeRiskFactorsHandlers();
    }
  }

  reinitializeDashboardHandlers() {
    if (window.dataHandler) {
      window.dataHandler.applyFilters();
    }
  }

  reinitializeWhyStruggleHandlers() {
    document.querySelectorAll('.cause-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const cause = e.target.dataset.cause;
        if (window.whyStruggleHandler) {
          window.whyStruggleHandler.showCauseDetail(cause);
        }
      });
    });
  }

  reinitializeRiskFactorsHandlers() {
    if (window.riskFactorsUI) {
      window.riskFactorsUI.attachCardClickListeners();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const understandingHandler = new UnderstandingHandler();
  understandingHandler.init();
  window.understandingHandler = understandingHandler;
});
