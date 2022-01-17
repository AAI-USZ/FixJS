function(event) {
    if (this._eatingEventsUntilNextCard) {
      event.stopPropagation();
      return;
    }
    if (this._popupActive) {
      event.stopPropagation();
      this._popupActive.close();
      return;
    }
    if (this._trayActive &&
        (event.clientX >
         this._containerNode.offsetWidth - this.TRAY_GUTTER_WIDTH)) {
      event.stopPropagation();
      this.moveToCard(this._activeCardIndex + 1);
    }
  }