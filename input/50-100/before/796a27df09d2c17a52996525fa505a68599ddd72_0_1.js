function() {
    qx.event.Registration.removeListener(this.__pblocker, 'tap', this.__onTapBlocker, this);
    
    var rootElement = this.__root.getElement();
    rootElement.removeChild(this.__pblocker);
    rootElement.removeChild(this.__mblocker);
    this.__root = this.__pblocker = this.__mblocker = this.__overlays = this.__visibleOverlays = this.__styleRegistry = null;
  }