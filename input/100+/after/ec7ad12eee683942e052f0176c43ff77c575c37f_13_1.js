function soundManager_handleEvent(evt) {
    if (!ScreenManager.screenEnabled)
      return;

    switch (evt.type) {
      case 'keydown':
        switch (evt.keyCode) {
          case evt.DOM_VK_PAGE_UP:
            this.repeatKey((function repeatKeyCallback() {
              if (this.currentVolume == 10) {
                clearTimeout(this._timer);
                return;
              }
              this.changeVolume(1);
            }).bind(this));
            break;

          case evt.DOM_VK_PAGE_DOWN:
            this.repeatKey((function repeatKeyCallback() {
              if (this.currentVolume == 0) {
                clearTimeout(this._timer);
                return;
              }
              this.changeVolume(-1);
            }).bind(this));
            break;
        }
        break;

      case 'keyup':
        if (evt.keyCode !== evt.DOM_VK_PAGE_UP &&
            evt.keyCode !== evt.DOM_VK_PAGE_DOWN)
          return;

        clearTimeout(this._timer);
        break;
    }
  }