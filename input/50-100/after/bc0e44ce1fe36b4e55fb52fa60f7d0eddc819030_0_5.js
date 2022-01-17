function browser_setUrlButtonMode(mode) {
    if (this.currentTab.url == this.START_PAGE_URL)
      mode = this.GO;
    this.urlButtonMode = mode;
    switch (mode) {
      case this.GO:
        this.urlButton.style.backgroundImage = 'url(style/images/go.png)';
        break;
      case this.REFRESH:
        this.urlButton.style.backgroundImage = 'url(style/images/refresh.png)';
        break;
      case this.STOP:
        this.urlButton.style.backgroundImage = 'url(style/images/stop.png)';
        break;
    }
  }