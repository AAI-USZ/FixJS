function browser_goBack() {
    this.currentTab.dom.goBack();
    this.refreshButtons();
  }