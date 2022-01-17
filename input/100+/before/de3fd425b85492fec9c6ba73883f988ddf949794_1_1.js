function(event) {
console.log("intercept event observed", event.type, this._suppressClick);
    // Contextmenu-derived click suppression wants to gobble an explicitly
    // expected event, and so takes priority over other types of suppression.
    if (event.type === 'click' && this._suppressClick) {
console.warn('suppress firing');
      this._suppressClick = false;
      event.stopPropagation();
      return;
    }
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