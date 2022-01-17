function browser_go(e) {
    if (e) {
      e.preventDefault();
    }

    if (this.urlButtonMode == this.REFRESH) {
      this.navigate(this.currentTab.url);
      return;
    }

    var url = this.urlInput.value.trim();
    var protocolRegexp = /^([a-z]+:)(\/\/)?/i;
    var protocol = protocolRegexp.exec(url);
    if (!protocol) {
      url = 'http://' + url;
    }

    if (url != this.currentTab.url) {
      this.urlInput.value = url;
      this.currentTab.url = url;
    }
    this.navigate(url);
    this.urlInput.blur();
  }