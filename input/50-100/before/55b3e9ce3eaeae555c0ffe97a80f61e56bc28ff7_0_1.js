function browser_refreshButtons() {
    this.currentTab.dom.getCanGoBack().onsuccess = (function(e) {
      this.backButton.disabled = !e.target.result;
    }).bind(this);
    this.currentTab.dom.getCanGoForward().onsuccess = (function(e) {
      this.forwardButton.disabled = !e.target.result;
    }).bind(this);
  }