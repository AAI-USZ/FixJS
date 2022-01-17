function(url) {
    this.currentUrl = url;
    if(this.loadedForms[url]) {
      $('lb-content').innerHTML = '';
      this.lbPlaceContentInDocument(this.loadedForms[url], $('lb-content'));
      this.form = $('lb-content').down('form');
    } else {
      new Ajax.Request(url, {onSuccess: this.lbFormDataLoaded.bind(this)});
    }
  }