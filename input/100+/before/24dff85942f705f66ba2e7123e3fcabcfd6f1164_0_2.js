function browser_handleTabsBadgeClicked() {
    if (this.currentScreen === this.TABS_SCREEN) {
      var tabId = this.createTab();
      this.showNewTabAnimation((function browser_showNewTabAnimation() {
        this.selectTab(tabId);
        this.showAwesomeScreen();
      }).bind(this));
      return;
    }
    if (this.currentScreen === this.AWESOME_SCREEN &&
        this.previousScreen === this.PAGE_SCREEN) {
      this.showPageScreen();
      return;
    }
    if (this.currentScreen === this.AWESOME_SCREEN) {
      this.deleteTab(this.currentTab.id);
    }
    this.showTabScreen();
  }