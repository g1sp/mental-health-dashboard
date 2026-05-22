// Family Challenge UI - Display and interact with shared family challenges

class FamilyChallengeUI {
  constructor() {
    this.modal = null;
  }

  init() {
    this.setupEventListeners();
    this.updateDisplay();
    this.attachFooter();
  }

  attachFooter() {
    setTimeout(() => {
      const pane = document.getElementById('familyChallengeContent');
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

  setupEventListeners() {
    // Start pairing
    const pairingBtn = document.getElementById('startFamilyPairingBtn');
    if (pairingBtn) {
      pairingBtn.addEventListener('click', () => this.showPairingFlow());
    }

    // Log completion buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.log-completion-btn')) {
        const persona = e.target.dataset.persona;
        this.logCompletion(persona);
      }
    });

    // Move to next week
    const nextWeekBtn = document.getElementById('moveToNextWeekBtn');
    if (nextWeekBtn) {
      nextWeekBtn.addEventListener('click', () => this.moveToNextWeek());
    }
  }

  // Show pairing modal for parent
  showParentPairingSetup() {
    const code = familyChallengeHandler.generatePairingCode();

    const html = `
      <div class="text-center mb-4">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔗</div>
        <h4>Invite Your Teen to Join</h4>
      </div>

      <div class="alert alert-info mb-4">
        <p class="mb-2"><strong>Your Pairing Code:</strong></p>
        <p style="font-size: 2rem; font-weight: bold; font-family: monospace; letter-spacing: 0.5rem; text-align: center;">
          ${code}
        </p>
        <p class="small text-muted mb-0">Share this code with your teen. They'll enter it to pair their account with yours.</p>
      </div>

      <div class="card border-0 bg-light mb-4">
        <div class="card-body">
          <h5 class="card-title">How it works:</h5>
          <ol class="mb-0 small">
            <li>Your teen opens the Family Challenge on their phone</li>
            <li>They select "Join Family Challenge"</li>
            <li>They enter your pairing code: <strong>${code}</strong></li>
            <li>You're connected! Now do challenges together.</li>
          </ol>
        </div>
      </div>

      <div class="alert alert-warning">
        <strong>⚠️ Important:</strong> This code is valid for 24 hours. Share it with your teen now so they can pair.
      </div>
    `;

    document.getElementById('familyPairingModalBody').innerHTML = html;
    new bootstrap.Modal(document.getElementById('familyPairingModal')).show();
  }

  // Show pairing modal for teen
  showTeenJoinFlow() {
    const html = `
      <div class="text-center mb-4">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🤝</div>
        <h4>Join Your Parent's Family Challenge</h4>
      </div>

      <div class="card border-0 bg-light mb-4">
        <div class="card-body">
          <p class="mb-3">Your parent has a pairing code. Enter it below to connect and start doing challenges together.</p>
          <div class="mb-3">
            <label for="pairingCodeInput" class="form-label">Enter Pairing Code</label>
            <input type="text" id="pairingCodeInput" class="form-control form-control-lg"
                   placeholder="4-digit code" maxlength="4" inputmode="numeric" style="text-align: center; font-size: 1.5rem; letter-spacing: 0.5rem;">
          </div>
          <button class="btn btn-primary w-100 btn-lg" onclick="familyChallengeUI.submitPairingCode()">
            Connect
          </button>
        </div>
      </div>

      <div class="alert alert-info small">
        <strong>What happens next:</strong> Once you connect, you and your parent will do 6 weeks of challenges together. You'll see each other's progress (if you both agree). This is about fixing it together, not judging.
      </div>
    `;

    document.getElementById('familyPairingModalBody').innerHTML = html;
    new bootstrap.Modal(document.getElementById('familyPairingModal')).show();
  }

  showPairingFlow() {
    const persona = personaHandler ? personaHandler.getPersona() : 'teen';
    if (persona === 'parent') {
      this.showParentPairingSetup();
    } else {
      this.showTeenJoinFlow();
    }
  }

  submitPairingCode() {
    const codeInput = document.getElementById('pairingCodeInput');
    const code = codeInput.value.trim();

    if (!code || code.length !== 4) {
      alert('Please enter a 4-digit code');
      return;
    }

    const result = familyChallengeHandler.pairWithParent(code);
    if (result.success) {
      alert(result.message);
      bootstrap.Modal.getInstance(document.getElementById('familyPairingModal')).hide();
      this.updateDisplay();
    } else {
      alert(result.message);
    }
  }

  // Display current challenge
  updateDisplay() {
    const container = document.getElementById('familyChallengeContainer');
    if (!container) return;

    const progress = familyChallengeHandler.getProgress();
    const challenge = familyChallengeHandler.getCurrentChallenge();
    const sharedProgress = familyChallengeHandler.getSharedProgress();

    if (!progress.isPaired) {
      container.innerHTML = this.getUnpairedHTML();
    } else {
      container.innerHTML = this.getPairedHTML(challenge, sharedProgress, progress);
    }

    this.setupEventListeners();
  }

  getUnpairedHTML() {
    return `
      <div class="row mb-4">
        <div class="col-12">
          <div class="card border-0 shadow-sm border-top border-primary border-4">
            <div class="card-body text-center py-5">
              <div style="font-size: 3rem; margin-bottom: 1rem;">👥</div>
              <h3 class="card-title mb-3">Family Challenge Mode</h3>
              <p class="text-muted mb-4">Fix your phone habits together. Parent and teen do the same challenges, see each other's progress, and rebuild connection.</p>
              <button class="btn btn-primary btn-lg" id="startFamilyPairingBtn">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-info text-white">
              <h5 class="mb-0">How It Works</h5>
            </div>
            <div class="card-body">
              <ol class="mb-0">
                <li class="mb-2"><strong>Connect:</strong> Parent creates a code, teen enters it</li>
                <li class="mb-2"><strong>Challenge Together:</strong> 6 weeks of shared challenges</li>
                <li class="mb-2"><strong>See Progress:</strong> Both see each other's streaks (opt-in)</li>
                <li class="mb-2"><strong>Build Trust:</strong> Do hard things together</li>
              </ol>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-success text-white">
              <h5 class="mb-0">Why This Works</h5>
            </div>
            <div class="card-body">
              <p class="mb-2">✅ <strong>Parent models behavior</strong> - Not "do as I say," but "do as I do"</p>
              <p class="mb-2">✅ <strong>Shared accountability</strong> - Easier together than alone</p>
              <p class="mb-2">✅ <strong>Real connection</strong> - Phone-free time rebuilds trust</p>
              <p class="mb-0">✅ <strong>Honest struggle</strong> - "We're both addicted, we're fixing it"</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getPairedHTML(challenge, sharedProgress, progress) {
    const targetCount = sharedProgress.targetCount;
    const parentPct = sharedProgress.parentPercentage;
    const teenPct = sharedProgress.teenPercentage;
    const persona = personaHandler ? personaHandler.getPersona() : 'teen';

    return `
      <div class="row mb-4">
        <div class="col-12">
          <div class="card border-0 shadow-sm border-top border-success border-4">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h3 class="card-title mb-1">Week ${progress.currentWeek}: ${challenge.title}</h3>
                  <p class="text-muted mb-0">${challenge.duration}</p>
                </div>
                <span class="badge bg-success">🤝 Connected</span>
              </div>

              <p class="lead mb-4">${challenge.whyItMatters}</p>

              <div class="row g-4 mb-4">
                <div class="col-md-6">
                  <div class="card border-0 bg-light">
                    <div class="card-body">
                      <h5 class="card-title">👤 Parent's Challenge</h5>
                      <p class="small mb-3">${challenge.parentChallenge}</p>
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <small class="text-muted"><strong>Progress:</strong> ${sharedProgress.parentCompleted}/${targetCount}</small>
                      </div>
                      <div class="progress mb-3" style="height: 8px;">
                        <div class="progress-bar" style="width: ${parentPct}%"></div>
                      </div>
                      ${persona === 'parent' ? `
                        <button class="btn btn-sm btn-outline-primary w-100 log-completion-btn" data-persona="parent">
                          ✓ Log Completion
                        </button>
                      ` : `
                        <small class="text-muted d-block text-center">Parent progress: ${sharedProgress.parentCompleted}/${targetCount}</small>
                      `}
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="card border-0 bg-light">
                    <div class="card-body">
                      <h5 class="card-title">👧 Teen's Challenge</h5>
                      <p class="small mb-3">${challenge.teenChallenge}</p>
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <small class="text-muted"><strong>Progress:</strong> ${sharedProgress.teenCompleted}/${targetCount}</small>
                      </div>
                      <div class="progress mb-3" style="height: 8px;">
                        <div class="progress-bar bg-info" style="width: ${teenPct}%"></div>
                      </div>
                      ${persona === 'teen' ? `
                        <button class="btn btn-sm btn-outline-info w-100 log-completion-btn" data-persona="teen">
                          ✓ Log Completion
                        </button>
                      ` : `
                        <small class="text-muted d-block text-center">Teen progress: ${sharedProgress.teenCompleted}/${targetCount}</small>
                      `}
                    </div>
                  </div>
                </div>
              </div>

              ${sharedProgress.bothOnTrack ? `
                <div class="alert alert-success mb-0">
                  <strong>🎉 Great work!</strong> You've both hit the target for this week. Ready to move to Week ${progress.currentWeek + 1}?
                  <button class="btn btn-sm btn-success ms-2" id="moveToNextWeekBtn">Next Week →</button>
                </div>
              ` : `
                <div class="alert alert-info mb-0">
                  <strong>Keep going!</strong> You're building momentum. ${Math.max(targetCount - sharedProgress.parentCompleted, targetCount - sharedProgress.teenCompleted)} ${challenge.trackingUnit} left this week.
                </div>
              `}
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm">
            <div class="card-header">
              <h5 class="mb-0">6-Week Journey</h5>
            </div>
            <div class="card-body">
              <div class="row g-2">
                ${Array.from({length: 6}, (_, i) => {
                  const weekNum = i + 1;
                  const isComplete = weekNum <= progress.totalWeeksCompleted;
                  const isCurrent = weekNum === progress.currentWeek;
                  return `
                    <div class="col-md-2">
                      <div class="card border-0 text-center ${isComplete ? 'bg-success bg-opacity-10' : isCurrent ? 'border-primary border-2' : ''}">
                        <div class="card-body p-2">
                          <h6 class="card-title mb-1">Week ${weekNum}</h6>
                          <small class="text-muted">${familyChallengeHandler.weeklySharedChallenges[i].title.substring(0, 12)}...</small>
                          ${isComplete ? '<div style="font-size: 1.5rem;">✓</div>' : ''}
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header">
              <h5 class="mb-0">💙 Affirmations</h5>
            </div>
            <div class="card-body">
              <p class="text-muted small mb-3">Share why you value each other. This matters more than you think.</p>
              ${persona === 'parent' ? `
                <div class="mb-3">
                  <textarea class="form-control" id="parentAffirmationInput" placeholder="Tell your teen why you value them..." rows="3"></textarea>
                  <button class="btn btn-sm btn-outline-primary mt-2 w-100" onclick="familyChallengeUI.addAffirmation('parent')">Send Affirmation</button>
                </div>
                <div class="alert alert-light small p-2">
                  <small><strong>From your teen:</strong></small>
                  ${familyChallengeHandler.getTeenAffirmations().slice(-2).map(a => `<p class="small mb-2 text-success">"${a.message}"</p>`).join('')}
                </div>
              ` : `
                <div class="mb-3">
                  <textarea class="form-control" id="teenAffirmationInput" placeholder="Tell your parent why you appreciate them..." rows="3"></textarea>
                  <button class="btn btn-sm btn-outline-info mt-2 w-100" onclick="familyChallengeUI.addAffirmation('teen')">Send Affirmation</button>
                </div>
                <div class="alert alert-light small p-2">
                  <small><strong>From your parent:</strong></small>
                  ${familyChallengeHandler.getParentAffirmations().slice(-2).map(a => `<p class="small mb-2 text-primary">"${a.message}"</p>`).join('')}
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  logCompletion(persona) {
    const success = familyChallengeHandler.logCompletion(persona);
    if (success) {
      const msg = persona === 'parent' ? 'Great job, parent! 👏' : 'You did it! 🎉';
      alert(msg);
      this.updateDisplay();
    }
  }

  moveToNextWeek() {
    familyChallengeHandler.completeWeek();
    this.updateDisplay();
  }

  addAffirmation(persona) {
    const inputId = persona === 'parent' ? 'parentAffirmationInput' : 'teenAffirmationInput';
    const input = document.getElementById(inputId);

    if (!input || !input.value.trim()) {
      alert('Please write your affirmation');
      return;
    }

    if (persona === 'parent') {
      familyChallengeHandler.addParentAffirmation(input.value.trim());
    } else {
      familyChallengeHandler.addTeenAffirmation(input.value.trim());
    }

    input.value = '';
    this.updateDisplay();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const familyChallengeUI = new FamilyChallengeUI();
  familyChallengeUI.init();
  window.familyChallengeUI = familyChallengeUI;
});
