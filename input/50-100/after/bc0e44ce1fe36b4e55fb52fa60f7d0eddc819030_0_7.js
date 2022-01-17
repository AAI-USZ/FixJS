function browser_showAwesomeScreen() {
    this.urlInput.focus();
    this.setUrlButtonMode(this.GO);
    this.tabsBadge.innerHTML = '';
    this.inTransition = false;
    this.switchScreen(this.AWESOME_SCREEN);
    this.tabCover.style.display = 'none';
    this.showTopSitesTab();
  }