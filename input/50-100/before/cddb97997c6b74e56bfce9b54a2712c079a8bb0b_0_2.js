function (evt) {
        var pointView = this.getPointViewUnderMouse(this.parentView.dataHolder, evt) || null;
        if (!pointView || pointView === undefined) {
          if (this._pointView) {
            this._pointView.mouseExited();
            this._pointView = null;
          }
        }
        else {
          pointView.mouseEntered();
        }
      }