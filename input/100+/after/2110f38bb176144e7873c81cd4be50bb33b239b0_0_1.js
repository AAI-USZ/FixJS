function(url) {
    this.state = 'loading';
    return this.page.open(url);
  }