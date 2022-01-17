function browser_goBack() {
    this.currentTab.session.back();
    this.refreshButtons();
  }