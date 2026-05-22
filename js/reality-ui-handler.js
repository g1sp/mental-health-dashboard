// Reality UI Handler - Render Teen and Parent Reality tabs

class RealityUIHandler {
  init() {
    this.renderTeenReality();
    this.renderParentReality();
    this.attachFooters();
  }

  attachFooters() {
    setTimeout(() => {
      const teenPane = document.getElementById('teenRealityContent');
      if (teenPane && !teenPane.querySelector('.source-footer')) {
        const footer = FooterHelper.getSourceFooter('teenSourcesTab');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = footer;
        wrapper.classList.add('source-footer');
        teenPane.appendChild(wrapper);
      }

      const parentPane = document.getElementById('parentRealityContent');
      if (parentPane && !parentPane.querySelector('.source-footer')) {
        const footer = FooterHelper.getSourceFooter('parentSourcesTab');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = footer;
        wrapper.classList.add('source-footer');
        parentPane.appendChild(wrapper);
      }
    }, 100);
  }

  renderTeenReality() {
    const data = teenRealityHandler.sections;

    // Quotes
    const quotesContainer = document.getElementById('teenQuotesContainer');
    if (quotesContainer && data.whatGenZSays) {
      quotesContainer.innerHTML = data.whatGenZSays.quotes.map(q => `
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h6 class="card-title text-primary">${q.stat}</h6>
              <p class="small text-muted mb-0">${q.context}</p>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Pattern
    const patternContainer = document.getElementById('teenPatternContainer');
    if (patternContainer && data.thePattern) {
      patternContainer.innerHTML = data.thePattern.sections.map(s => `
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h6 class="card-title mb-3">${s.heading}</h6>
              <div class="small">
                <p class="mb-2"><strong>Reality:</strong> ${s.real}</p>
                <p class="mb-2"><strong>What happens to you:</strong> ${s.you}</p>
                <p class="mb-0 text-danger"><strong>Result:</strong> ${s.result}</p>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Why Matters
    const whyContainer = document.getElementById('teenWhyMattersContainer');
    if (whyContainer && data.whyItMatters) {
      whyContainer.innerHTML = data.whyItMatters.points.map(p => `
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm h-100 bg-light">
            <div class="card-body">
              <h6 class="card-title text-success">${p.point}</h6>
              <p class="small mb-0">${p.explanation}</p>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  renderParentReality() {
    const data = parentRealityHandler.sections;

    // Numbers
    const numbersContainer = document.getElementById('parentNumbersContainer');
    if (numbersContainer && data.theNumbers) {
      numbersContainer.innerHTML = data.theNumbers.critical.map(n => `
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100 border-left border-danger">
            <div class="card-body">
              <h6 class="card-title text-danger">${n.stat}</h6>
              <p class="small text-muted mb-2"><em>${n.source}</em></p>
              <p class="small mb-0"><strong>Why it matters:</strong> ${n.implication}</p>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Protective Factors
    const protectiveContainer = document.getElementById('parentProtectiveContainer');
    if (protectiveContainer && data.theProtectiveFactors) {
      protectiveContainer.innerHTML = data.theProtectiveFactors.factors.map(f => `
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100 bg-light">
            <div class="card-body">
              <h6 class="card-title text-success">${f.factor}</h6>
              <p class="small mb-2"><strong>Evidence:</strong> ${f.evidence}</p>
              <p class="small mb-0"><strong>What you can do:</strong> ${f.what_parents_can_do}</p>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Why Matters
    const whyContainer = document.getElementById('parentWhyMattersContainer');
    if (whyContainer && data.whyThisMatters) {
      whyContainer.innerHTML = data.whyThisMatters.statements.map(s => `
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h6 class="card-title">${s.statement}</h6>
              <p class="small text-muted mb-0">${s.why}</p>
            </div>
          </div>
        </div>
      `).join('');
    }

    // What Works
    const worksContainer = document.getElementById('parentWhatWorksContainer');
    if (worksContainer && data.whatNowWorks) {
      worksContainer.innerHTML = data.whatNowWorks.approaches.map(a => `
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100 bg-light">
            <div class="card-body">
              <h6 class="card-title text-info">${a.approach}</h6>
              <p class="small mb-0">${a.how}</p>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const realityUI = new RealityUIHandler();
  realityUI.init();
});
