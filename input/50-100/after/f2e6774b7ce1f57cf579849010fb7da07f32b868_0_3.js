function browser_showHistoryTab() {
    this.historyTab.classList.remove('selected');
    this.history.classList.remove('selected');
    this.bookmarksTab.classList.add('selected');
    this.bookmarks.classList.add('selected');
    Places.getBookmarks(this.showBookmarks.bind(this));
  }