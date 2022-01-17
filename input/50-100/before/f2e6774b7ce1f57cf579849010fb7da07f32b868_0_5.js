function browser_selectTab(id) {
    this.currentTab = this.tabs[id];
    // We may have picked a currently loading background tab
    // that was positioned off screen
    this.urlInput.value = this.currentTab.title;
    this.tabCover.setAttribute('src', this.currentTab.screenshot);

    if (this.currentTab.loading) {
      this.throbber.classList.add('loading');
    }
    this.refreshButtons();
  }