function browser_handleWindowOpen(evt) {
    var origin = evt.target.dataset.frameOrigin;
    var name = evt.detail.name;
    var url = evt.detail.url;
    var frame = evt.detail.frameElement;
    var tab;

    if (this.openedWindows[origin] && this.openedWindows[origin][name]) {
      tab = this.openedWindows[origin][name];
    } else {
      tab = this.createTab(url, frame);
    }

    this.hideCurrentTab();
    this.selectTab(tab);
    // The frame will already be loading once we recieve it, which
    // means we need to assume it is loading
    this.currentTab.loading = true;
    this.setTabVisibility(this.currentTab, true);
    this.updateTabsCount();

    if (!this.openedWindows[origin])
      this.openedWindows[origin] = {};
    this.openedWindows[origin][name] = tab;
  }