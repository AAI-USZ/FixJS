function browser_urlFocus(e) {
    if (this.currentScreen === this.PAGE_SCREEN) {
      this.urlInput.value = this.currentTab.url;
      this.shouldFocus = true;
      this.showAwesomeScreen();
    } else if (this.currentScreen === this.AWESOME_SCREEN) {
      this.shouldFocus = true;
    }
  }