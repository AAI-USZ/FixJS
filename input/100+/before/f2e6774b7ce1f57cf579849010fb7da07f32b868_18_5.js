function cd_handleEvent(evt) {
    if (evt.type == 'resize') {
      //XXX: the keyboard resizes the frame before we get the ESCAPE
      // event. So _keyboardDisplayed is always false when we get it
      // if we don't add this timeout
      var keyboardDisplayed = (this._overlayHeight >
                               this.overlay.getBoundingClientRect().height);
      window.setTimeout((function() {
        this._keyboardDisplayed = keyboardDisplayed;
      }).bind(this), 300);
      return;
    }

    if (evt.type !== 'keyup' || evt.keyCode != evt.DOM_VK_ESCAPE) {
      return;
    }

    // If the user escaped just to remove the keyboard we stay
    // in edit mode
    if (this._keyboardDisplayed) {
      evt.preventDefault();
      return;
    }

    if (this.endEditing() || this.hide()) {
      evt.preventDefault();
    }
  }