function pm_backHandling(evt) {
    if (!this._currentPopup)
      return;

    this.close();
    evt.preventDefault();
    evt.stopPropagation();
  }