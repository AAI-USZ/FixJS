function browser_handleEvent(evt) {
    var urlInput = this.urlInput;
    switch (evt.type) {
      case 'submit':
        this.handleUrlFormSubmit(evt);
        break;

      case 'keyup':
        if (evt.keyCode === evt.DOM_VK_ESCAPE) {
          evt.preventDefault();
          this.showPageScreen();
          this.urlInput.blur();
        }
    }
  }