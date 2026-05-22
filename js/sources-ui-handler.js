// Sources UI Handler - Render sources for both teen and parent personas

class SourcesUIHandler {
  init() {
    this.renderTeenSources();
    this.renderParentSources();
  }

  renderTeenSources() {
    const container = document.getElementById('teenSourcesContainer');
    if (!container || !teenSourcesHandler) return;

    const data = teenSourcesHandler.getAll();

    container.innerHTML = `
      <div class="row mb-5">
        <div class="col-12">
          <h3>${data.title}</h3>
          <p class="text-muted">${data.intro}</p>
        </div>
      </div>

      ${data.categories.map(cat => `
        <div class="row mb-5">
          <div class="col-12">
            <h5 class="mb-3 text-primary">${cat.category}</h5>
            <div class="row g-3">
              ${cat.sources.map(source => `
                <div class="col-lg-6">
                  <div class="card border-0 shadow-sm h-100">
                    <div class="card-body">
                      <h6 class="card-title mb-2">${source.name}</h6>
                      <p class="small text-muted mb-2">${source.description}</p>
                      ${source.stats ? `<p class="small mb-2"><strong>Data:</strong> ${source.stats}</p>` : ''}
                      ${source.year ? `<p class="small text-muted mb-2">Year: ${source.year}</p>` : ''}
                      ${source.url ? `<a href="${source.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">Learn More →</a>` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('')}

      <div class="row mt-5">
        <div class="col-12">
          <div class="alert alert-info">
            <strong>📚 Important:</strong> All information in this app is for educational purposes. It is not a substitute for professional medical advice, diagnosis, or treatment. If you're struggling, reach out to a trusted adult or contact 988 (Suicide & Crisis Lifeline).
          </div>
        </div>
      </div>
    `;
  }

  renderParentSources() {
    const container = document.getElementById('parentSourcesContainer');
    if (!container || !parentSourcesHandler) return;

    const data = parentSourcesHandler.getAll();

    container.innerHTML = `
      <div class="row mb-5">
        <div class="col-12">
          <h3>${data.title}</h3>
          <p class="text-muted">${data.intro}</p>
        </div>
      </div>

      ${data.categories.map(cat => `
        <div class="row mb-5">
          <div class="col-12">
            <h5 class="mb-3 text-primary">${cat.category}</h5>
            <div class="row g-3">
              ${cat.sources.map(source => `
                <div class="col-lg-6">
                  <div class="card border-0 shadow-sm h-100">
                    <div class="card-body">
                      <h6 class="card-title mb-2">${source.name}</h6>
                      <p class="small text-muted mb-2">${source.description}</p>
                      ${source.stats ? `<p class="small mb-2"><strong>Data:</strong> ${source.stats}</p>` : ''}
                      ${source.year ? `<p class="small text-muted mb-2">Year: ${source.year}</p>` : ''}
                      ${source.url ? `<a href="${source.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">Learn More →</a>` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('')}

      <div class="row mt-5">
        <div class="col-12">
          <div class="alert alert-info">
            <strong>📚 Disclaimer:</strong> All information is for educational purposes and based on peer-reviewed research and government surveys. This app is a complementary resource and is not a substitute for professional medical advice or treatment. Always consult with qualified mental health professionals regarding your teen's specific needs.
          </div>
        </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sourcesUI = new SourcesUIHandler();
  sourcesUI.init();
});
