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
    this.embedParentGuidanceContent();
  }

  embedDashboardContent() {
    const container = document.getElementById('dashboardEmbedded');
    const dashboardContent = document.getElementById('dashboardContent');

    if (!container || !dashboardContent) return;

    container.innerHTML = dashboardContent.innerHTML;

    setTimeout(() => {
      this.reinitializeDashboardHandlers();
    }, 100);
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
    if (window.chartManager && window.dataHandler) {
      setTimeout(() => {
        window.chartManager.initCharts();
        window.dataHandler.applyFilters();
      }, 50);
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

  embedParentGuidanceContent() {
    const container = document.getElementById('parentGuidanceEmbedded');
    if (!container) return;

    const parentGuidanceContent = document.getElementById('parentGuidanceContent');
    if (parentGuidanceContent) {
      container.innerHTML = parentGuidanceContent.innerHTML;
      this.reinitializeParentGuidanceHandlers();
    }
  }

  reinitializeParentGuidanceHandlers() {
    if (window.parentHandler && window.parentUI) {
      window.parentUI.populateSectionList();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const understandingHandler = new UnderstandingHandler();
  understandingHandler.init();
  window.understandingHandler = understandingHandler;
});
