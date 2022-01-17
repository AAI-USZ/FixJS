function browser_selectTab(id) {
    this.currentTab = this.tabs[id];
    // We may have picked a currently loading background tab
    // that was positioned off screen
    this.setUrlBar(this.currentTab.title);
    this.tabCover.setAttribute('src', this.currentTab.screenshot);

    this.updateSecurityIcon();
    this.refreshButtons();
  }