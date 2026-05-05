class UnderstandingHandler {
  constructor() {
    this.currentTab = 'Data';
  }

  init() {
    // Move original tab contents into Understanding container
    this.moveContent('dashboardContent', 'understandingData');
    this.moveContent('whyStruggleContent', 'understandingRootCauses');
    this.moveContent('riskFactorsContent', 'understandingRisks');
    this.moveContent('parentGuidanceContent', 'understandingParentGuidance');

    const tabButtons = document.querySelectorAll('.understanding-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    this.switchTab('Data');
  }

  moveContent(sourceId, targetId) {
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);

    if (source && target) {
      source.style.display = '';
      source.style.visibility = 'visible';
      target.appendChild(source);
    }
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    // Hide all understanding tab contents
    document.querySelectorAll('.understanding-tab-content').forEach(el => {
      el.style.display = 'none';
    });

    // Deactivate all buttons
    document.querySelectorAll('.understanding-tab-btn').forEach(el => {
      el.classList.remove('active');
    });

    // Show selected tab content
    const contentId = `understanding${tabName}`;
    const content = document.getElementById(contentId);
    if (content) {
      content.style.display = '';
    }

    // Activate clicked button
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Trigger handler updates if needed
    this.triggerTabHandlers(tabName);
  }

  triggerTabHandlers(tabName) {
    if (tabName === 'Data' && window.dataHandler) {
      window.dataHandler.applyFilters();
    } else if (tabName === 'RootCauses' && window.whyStruggleHandler) {
      // Root causes already initialized
    } else if (tabName === 'Risks' && window.riskFactorsHandler) {
      // Risk factors already initialized
    } else if (tabName === 'ParentGuidance' && window.parentHandler) {
      // Parent guidance already initialized
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const understandingHandler = new UnderstandingHandler();
  understandingHandler.init();
  window.understandingHandler = understandingHandler;
});
