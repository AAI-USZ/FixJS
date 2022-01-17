function md_handleEvent(evt) {
    var elements = this.elements;
    switch (evt.type) {
      case 'mozbrowsershowmodalprompt':
        if (evt.target.dataset.frameType != 'window')
          return;

        evt.preventDefault();
        var origin = evt.target.dataset.frameOrigin;
        this.currentEvents[origin] = evt;

        // Show modal dialog only if
        // the frame is currently displayed.
        if (origin == WindowManager.getDisplayedApp())
          this.show(origin);
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
        this.show(evt.detail.origin);
        break;

      case 'appwillclose':
        // Do nothing if the app is closed at background.
        if (evt.detail.origin !== this.currentOrigin)
          return;

        // Reset currentOrigin
        this.hide();
        break;
    }
  }