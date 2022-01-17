function(url) {
    this.currentUrl = url;
    if(this.loadedForms[url]) {
      $('lb-content').innerHTML = '';
      this.lbPlaceContentInDocument(this.loadedForms[url], $('lb-content'));
      this.form = c.getElementsByTagName('form')[0];
    } else {
      new Ajax.Request(url, {onSuccess: this.lbFormDataLoaded.bind(this)});
    }
  }