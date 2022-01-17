function browser_showPageScreen() {
    if (this.currentScreen === this.TABS_SCREEN) {
      var hideCover = (function browser_hideCover() {
        this.tabCover.removeAttribute('src');
        this.tabCover.style.display = 'none';
      }).bind(this);

      var switchLive = (function browser_switchLive() {
        this.mainScreen.removeEventListener('transitionend', switchLive, true);
        this.setTabVisibility(this.currentTab, true);
        // Give the page time to render to avoid a flash when switching
        // TODO: remove
        setTimeout(hideCover, 250);
      }).bind(this);
      this.mainScreen.addEventListener('transitionend', switchLive, true);
    } else {
      this.setTabVisibility(this.currentTab, true);
    }

    if (this.currentTab.loading) {
      this.setUrlButtonMode(this.STOP);
      this.throbber.classList.add('loading');
    } else {
      var urlButton = this.currentTab.url ? this.REFRESH : this.GO;
      this.setUrlButtonMode(urlButton);
      this.throbber.classList.remove('loading');
    }

    this.switchScreen(this.PAGE_SCREEN);
    this.urlInput.value = this.currentTab.title || this.currentTab.url;
    this.updateTabsCount();
  }