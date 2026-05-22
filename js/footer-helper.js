// Footer Helper - Generates consistent source attribution footer for all tabs

class FooterHelper {
  static getSourceFooter(tabId = 'teenSourcesTab') {
    return `
      <div class="row mt-5 pt-4 border-top">
        <div class="col-12">
          <small class="text-muted">
            📚 <a href="#${tabId}" data-bs-toggle="tab" class="text-muted text-decoration-none" style="text-decoration: underline !important;">Data sources for this content</a> | All information is for educational purposes.
          </small>
        </div>
      </div>
    `;
  }

  static addFooterToContainer(containerId, tabId = 'teenSourcesTab') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const footer = this.getSourceFooter(tabId);
    const wrapper = container.closest('.tab-pane');
    if (wrapper) {
      const footerElement = document.createElement('div');
      footerElement.innerHTML = footer;
      wrapper.appendChild(footerElement);
    }
  }
}
