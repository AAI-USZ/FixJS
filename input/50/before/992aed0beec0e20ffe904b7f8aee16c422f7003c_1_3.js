function (evt) {
        if (!this._pointView) {
          return;
        }
        this._pointView.mouseDragged(evt);
      }