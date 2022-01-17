function ls_switchPanel(panel) {
    var overlay = this.overlay;
    var self = this;
    this.loadPanel(panel, function panelLoaded() {
      self.unloadPanel(overlay.dataset.panel, function panelUnloaded() {
        overlay.dataset.panel = panel || '';
      });
    });
  }