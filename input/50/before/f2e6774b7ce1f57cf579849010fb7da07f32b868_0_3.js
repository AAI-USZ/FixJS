function browser_goForward() {
    this.currentTab.session.forward();
    this.refreshButtons();
  }