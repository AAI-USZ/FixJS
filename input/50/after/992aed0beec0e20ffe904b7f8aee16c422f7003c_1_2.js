function (evt) {
        if (this._pointView) {
          this._pointView.mouseExited();
          this._pointView.mouseUp(evt);
        }
        this._pointView = null;
      }