function browser_updateHistory(url) {
    GlobalHistory.addVisit(url);
    this.refreshButtons();
  }