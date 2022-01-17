function browser_refreshButtons() {
    // When handling window.open we may hit this code
    // before canGoBack etc has been applied to the frame
    if (!this.currentTab.dom.getCanGoBack)
      return;

    this.currentTab.dom.getCanGoBack().onsuccess = (function(e) {
      this.backButton.disabled = !e.target.result;
    }).bind(this);
    this.currentTab.dom.getCanGoForward().onsuccess = (function(e) {
      this.forwardButton.disabled = !e.target.result;
    }).bind(this);
    this.refreshBookmarkButton();
  }