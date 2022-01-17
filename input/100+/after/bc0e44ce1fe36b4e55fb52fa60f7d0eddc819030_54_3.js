function km_handleEvent(evt) {
    var target = evt.target;
    switch (evt.type) {
      case 'showime':
        clearTimeout(this._hideIMETimer);
        this.showIME(evt.detail.type);

        break;

      // Now this is for keyboard demo only
      case 'hideime':
        this.hideIMETimer = window.setTimeout((function execHideIME() {
          IMEController.hideIME();
        }).bind(this), 0);

        break;

      // Now this is for keyboard demo only
      case 'appwillclose':
        IMEController.hideIME(true);

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