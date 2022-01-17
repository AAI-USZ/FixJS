function browser_refreshButtons() {
    this.backButton.disabled = !this.currentTab.session.backLength();
    this.forwardButton.disabled = !this.currentTab.session.forwardLength();
  }