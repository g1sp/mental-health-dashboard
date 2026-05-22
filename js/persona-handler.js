class PersonaHandler {
  constructor() {
    this.personas = {
      teen: {
        label: '👤 Teen',
        description: 'Focus on support tools and self-help resources',
        tabOrder: ['crisisResourcesTab', 'copingTab', 'journalTab', 'chatTab']
      },
      parent: {
        label: '👨‍👩‍👧 Parent',
        description: 'Focus on understanding and supporting your teen',
        tabOrder: ['understandingTab', 'treatmentsTab', 'parentCrisisTab']
      }
    };

    let saved = localStorage.getItem('selectedPersona');
    this.currentPersona = (saved && this.personas[saved]) ? saved : 'teen';
  }

  init() {
    const select = document.getElementById('personaSelect');
    if (!select) return;

    select.value = this.currentPersona;
    this.applyPersona(this.currentPersona);

    select.addEventListener('change', (e) => {
      this.setPersona(e.target.value);
    });
  }

  setPersona(persona) {
    if (!this.personas[persona]) return;
    this.currentPersona = persona;
    localStorage.setItem('selectedPersona', persona);
    this.applyPersona(persona);
  }

  applyPersona(persona) {
    const personaConfig = this.personas[persona];

    document.querySelectorAll('.persona-tab').forEach(tab => {
      const allowedPersonas = tab.dataset.personas.split(',');
      if (allowedPersonas.includes(persona)) {
        tab.style.display = '';
      } else {
        tab.style.display = 'none';
      }
    });

    this.reorderTabs(personaConfig.tabOrder);
    this.ensureValidActiveTab(persona);
  }

  reorderTabs(tabOrder) {
    const tabContainer = document.getElementById('mainTabs');
    if (!tabContainer) return;

    // Use CSS order instead of DOM reordering to avoid breaking Bootstrap tabs
    tabContainer.style.display = 'flex';
    tabContainer.style.flexDirection = 'row';

    document.querySelectorAll('.persona-tab').forEach((tab, index) => {
      const tabId = tab.querySelector('[data-bs-toggle="tab"]')?.id;
      const orderIndex = tabOrder.indexOf(tabId);
      tab.style.order = orderIndex !== -1 ? orderIndex : 999;
    });
  }

  ensureValidActiveTab(persona) {
    const activeTab = document.querySelector('.nav-link.active');
    const activeParent = activeTab?.closest('.persona-tab');

    if (activeParent && activeParent.style.display === 'none') {
      const visibleTabs = document.querySelectorAll('.persona-tab:not([style*="display: none"])');
      if (visibleTabs.length > 0) {
        const firstVisibleButton = visibleTabs[0].querySelector('.nav-link');
        if (firstVisibleButton) {
          // Remove .show.active from all panes
          document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('show', 'active');
          });

          // Click the button to activate the new tab
          firstVisibleButton.click();

          // Ensure the target pane is shown
          const target = firstVisibleButton.getAttribute('data-bs-target');
          if (target) {
            const pane = document.querySelector(target);
            if (pane) {
              pane.classList.add('show', 'active');
            }
          }
        }
      }
    }
  }

  getPersona() {
    return this.currentPersona;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const personaHandler = new PersonaHandler();
  personaHandler.init();
  window.personaHandler = personaHandler;
});
