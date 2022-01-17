function md_handleEvent(evt) {
    var elements = this.elements;
    switch (evt.type) {
      case 'mozbrowsershowmodalprompt':
        evt.preventDefault();
        this.evt[evt.target.dataset.frameOrigin] = evt;

        var displayedOrigin = WindowManager.getDisplayedApp();
        if (displayedOrigin) {
          var frame = WindowManager.getAppFrame(displayedOrigin);

          // Show modal dialog only if
          // the frame is currently displayed.
          if (frame == evt.target) {
            this.show(evt.target.dataset.frameOrigin);
          }
        }
        break;

      case 'click':
        if (evt.currentTarget === elements.confirmCancel ||
            evt.currentTarget === elements.promptCancel) {
          this.cancelHandler();
        } else {
          this.confirmHandler();
        }
        break;

      case 'appopen':
        this.currentOrigin = evt.detail.url;
        this.show(this.currentOrigin);
        break;

      case 'appclose':
        if (evt.target.dataset.frameOrigin == this.currentOrigin) {
          this.currentOrigin = null;
          this.show(this.currentOrigin);
        }
        break;
    }
  }