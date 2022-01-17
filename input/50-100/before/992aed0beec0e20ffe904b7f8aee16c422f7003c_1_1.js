function (evt) {
        var pointView = this.getPointViewUnderMouse(this.parentView.dataHolder, evt) || null;
        this._pointView = pointView;
        if (!pointView) {
          return;
        }

        this._pointView = pointView;
        pointView.mouseDown();
      }