function km_handleEvent(evt) {
    var target = evt.target;
    switch (evt.type) {
      case 'showime':
        clearTimeout(this._hideIMETimer);
        this.showIME(evt.detail.type);

        break;

      case 'resize':
        var currentWidth = window.innerWidth;
        var currentHeight = window.innerHeight;
        var formerWidth = this._formerWidth;
        var formerHeight = this._formerHeight;

        IMEController.onResize(
          currentWidth, currentHeight,
          formerWidth, formerHeight
        );

        this._formerWidth = currentWidth;
        this._formerHeight = currentHeight;
      break;

      case 'unload':
        this.uninit();
      break;
    }
  }