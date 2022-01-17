function browser_urlFocus() {
    if (this.currentScreen === this.PAGE_SCREEN) {
      this.urlInput.value = this.currentTab.url;
      this.urlInput.select();
      this.showAwesomeScreen();
    }
  }