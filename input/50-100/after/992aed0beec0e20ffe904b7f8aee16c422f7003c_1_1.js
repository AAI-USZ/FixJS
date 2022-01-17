function (evt) {
        var pointView = this.getPointViewUnderMouse(this.parentView.dataHolder, evt) || null;
        if (!pointView || pointView === undefined) {
          this._pointView = null;
          return;
        }
        this._pointView = pointView;
        pointView.mouseDown();
      }