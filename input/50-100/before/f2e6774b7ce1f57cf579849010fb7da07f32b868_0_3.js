function browser_openInNewTab(url) {
    this.createTab(url);
    this.tabsBadge.innerHTML = Object.keys(this.tabs).length;
  }