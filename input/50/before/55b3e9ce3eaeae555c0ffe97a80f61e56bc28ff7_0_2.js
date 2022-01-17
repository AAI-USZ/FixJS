function browser_goForward() {
    this.currentTab.dom.goForward();
    this.refreshButtons();
  }