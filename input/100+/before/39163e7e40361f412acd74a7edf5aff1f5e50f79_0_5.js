function (event){

    /*
    // @TODO Context menu?
    if(event.isRightClick()) {
      event.stop();

      var overlay = this.overlay;
      overlay.hide();

      function cancelContextMenu () {
        overlay.show();
        E.stopObserving(document, 'mousemove', cancelContextMenu);
      }
      E.observe(document, 'mousemove', cancelContextMenu);
      return;
    }
    */

    // @TODO why?
    this.mouseUpHandler = _.bind(this.mouseUpHandler, this);
    E.observe(document, 'mouseup', this.mouseUpHandler);
    E.fire(this.el, 'flotr:mousedown', [event, this]);
    this.ignoreClick = false;
  }