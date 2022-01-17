function (evt) {
        if (!(this._pointView) || this._pointView === undefined) {
          return;
        }
        this._pointView.mouseDragged(evt);
      }