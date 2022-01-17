function browser_go(e) {
    if (e) {
      e.preventDefault();
    }

    if (this.urlButtonMode == this.REFRESH) {
      this.navigate(this.currentTab.url);
      return;
    }

    var url = this.urlInput.value.trim();
    // If the address entered starts with a quote then search, if it
    // contains a . or : then treat as a url, else search
    var isSearch = /^"|\'/.test(url) || !(/\.|\:/.test(url));
    var protocolRegexp = /^([a-z]+:)(\/\/)?/i;
    var protocol = protocolRegexp.exec(url);

    if (isSearch) {
      url = 'http://www.bing.com/search?q=' + url;
    } else if (!protocol) {
      url = 'http://' + url;
    }

    if (url != this.currentTab.url) {
      this.urlInput.value = url;
      this.currentTab.url = url;
    }
    this.navigate(url);
    this.urlInput.blur();
  }