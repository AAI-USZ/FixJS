function browser_updateHistory(url) {
    Places.addVisit(url);
    this.refreshButtons();
  }