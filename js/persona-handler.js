class PersonaHandler {
  constructor() {
    this.personas = {
      teen: {
        label: '👤 Teen',
        description: 'Focus on support tools and self-help resources',
        tabOrder: ['teenRealityTab', 'teenChallengesTab', 'familyChallengeTab', 'copingTab', 'journalTab', 'chatTab', 'crisisResourcesTab', 'teenSourcesTab']
      },
      parent: {
        label: '👨‍👩‍👧 Parent',
        description: 'Focus on understanding and supporting your teen',
        tabOrder: ['parentRealityTab', 'understandingTab', 'familyChallengeTab', 'parentHowToHelpTab', 'treatmentsTab', 'parentCrisisTab', 'parentSourcesTab']
      }
    };

    let saved = localStorage.getItem('selectedPersona');
    this.currentPersona = (saved && this.personas[saved]) ? saved : 'parent';
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

    // First, remove active class from ALL tab buttons
    document.querySelectorAll('.nav-link').forEach(btn => {
      btn.classList.remove('active');
    });

    // Hide/show tabs based on persona
    document.querySelectorAll('.persona-tab').forEach(tab => {
      const allowedPersonas = tab.dataset.personas.split(',');
      if (allowedPersonas.includes(persona)) {
        tab.style.display = '';
      } else {
        tab.style.display = 'none';
      }
    });

    this.reorderTabs(personaConfig.tabOrder);
    this.activateFirstVisibleTab(personaConfig.tabOrder);
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

  activateFirstVisibleTab(tabOrder) {
    // Find the first visible tab in the correct order
    for (const tabId of tabOrder) {
      const button = document.getElementById(tabId);
      if (button) {
        const tab = button.closest('.persona-tab');
        if (tab && tab.style.display !== 'none') {
          // Set button as active
          button.classList.add('active');
          button.setAttribute('aria-selected', 'true');

          // Show corresponding pane
          const targetId = button.getAttribute('data-bs-target');
          if (targetId) {
            const pane = document.querySelector(targetId);
            if (pane) {
              // Remove active/show from all panes
              document.querySelectorAll('.tab-pane').forEach(p => {
                p.classList.remove('active', 'show');
              });
              // Add to this pane
              pane.classList.add('active', 'show');
            }
          }
          return;
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
