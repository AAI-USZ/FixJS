function (evt) {
        var pointView = this.getPointViewUnderMouse(this.parentView.dataHolder, evt) || null;
        if (!pointView) {
          this._pointView = null;
          return;
        }
        this._pointView = pointView;
        pointView.mouseDown();
      }