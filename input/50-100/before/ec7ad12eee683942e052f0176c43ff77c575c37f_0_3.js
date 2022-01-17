function browser_showAwesomeScreen() {
    GlobalHistory.getHistory(this.showGlobalHistory.bind(this));
    this.urlInput.focus();
    this.setUrlButtonMode(this.GO);
    this.tabsBadge.innerHTML = '';
    this.switchScreen(this.AWESOME_SCREEN);
    this.tabCover.style.display = 'none';
  }