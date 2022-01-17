function browser_handlePageScreenClicked(e) {
    if (this.inTransition) {
      return;
    }
    if (this.currentScreen === this.TABS_SCREEN) {
      this.showPageScreen();
    }
  }