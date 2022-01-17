function browser_handleEvent(evt) {
    var urlInput = this.urlInput;
    switch (evt.type) {
      case 'submit':
        this.go(evt);
        break;

      case 'keyup':
        if (evt.keyCode === evt.DOM_VK_ESCAPE) {
          this.showPageScreen();
          this.urlInput.blur();
        }
    }
  }