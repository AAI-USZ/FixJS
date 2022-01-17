function as_hide(evt) {
    if (evt.keyCode == evt.DOM_VK_ESCAPE ||
        evt.keyCode == evt.DOM_VK_HOME) {

      if (this.screen.querySelectorAll('iframe').length > 0) {
        if (!this.screen.classList.contains('status')) {
          this.screen.classList.add('status');

          // The user is hiding the attention screen to use the phone we better
          // not turn the sreen off when the attention screen is closed.
          this._screenInitiallyDisabled = false;
        }
      }
    }
  }