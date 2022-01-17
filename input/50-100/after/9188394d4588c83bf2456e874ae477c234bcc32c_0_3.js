function browser_navigate(url) {
    this.showPageScreen();
    this.currentTab.title = null;
    this.currentTab.url = url;
    this.currentTab.dom.setAttribute('src', url);
    this.setUrlBar(url);
  }