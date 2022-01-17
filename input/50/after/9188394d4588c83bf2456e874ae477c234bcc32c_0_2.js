function browser_urlFocus() {
    if (this.currentScreen === this.PAGE_SCREEN) {
      this.setUrlBar(this.currentTab.url);
      this.urlInput.select();
      this.showAwesomeScreen();
    }
  }