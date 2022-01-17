function(data) {
    debug("recvHello");

    // Inform our child if our owner element's document is invisible.  Note
    // that we must do so here, rather than in the BrowserElementParent
    // constructor, because the BrowserElementChild may not be initialized when
    // we run our constructor.
    if (this._window.document.mozHidden) {
      this._ownerVisibilityChange();
    }
  }