function() {
    qx.event.Registration.removeListener(this.__pblocker, 'tap', this.__onTapBlocker, this);

    this.__root = this.__pblocker = this.__mblocker = this.__overlays = this.__visibleOverlays = this.__styleRegistry = null;
  }