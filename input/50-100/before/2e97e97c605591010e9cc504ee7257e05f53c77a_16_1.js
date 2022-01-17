function ls_switchPanel(panel) {
    var overlay = this.overlay;
    this.unloadPanel(overlay.dataset.panel);

    if (panel) {
      overlay.dataset.panel = panel;
      this.loadPanel(panel);
    } else {
      delete overlay.dataset.panel;
    }
  }