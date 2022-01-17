function browser_setUrlBar(data) {
    if (this.currentTab.url == this.START_PAGE_URL) {
      this.urlInput.value = '';
    } else {
      this.urlInput.value = data;
    }
  }