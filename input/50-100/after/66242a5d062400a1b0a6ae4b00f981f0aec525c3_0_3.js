function browser_urlFocus(e) {
    if (this.currentScreen === this.PAGE_SCREEN) {
      this.urlInput.value = this.currentTab.url;
      this.setUrlBar(this.currentTab.url);
      this.showAwesomeScreen();
      this.shouldFocus = true;
    } else if (this.currentScreen === this.AWESOME_SCREEN) {
      this.shouldFocus = true;
    }
  }