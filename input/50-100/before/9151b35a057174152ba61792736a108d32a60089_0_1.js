function browser_handleEvent(evt) {
    var urlInput = this.urlInput;
    switch (evt.type) {
      case 'submit':
          this.go(evt);
        break;

      case 'keyup':
        if (!this.currentTab || !this.currentTab.session.backLength() ||
          evt.keyCode != evt.DOM_VK_ESCAPE)
          break;

        this.goBack();
        evt.preventDefault();
        break;
    }
  }