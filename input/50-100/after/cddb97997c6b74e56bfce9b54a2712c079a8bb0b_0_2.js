function (evt) {
        if (this._pointView) {
          return;
        }
        var pointView = this.getPointViewUnderMouse(this.parentView.dataHolder, evt) || null;
        if (!pointView) {
          if (this._currentPoint) {
            this._currentPoint.mouseExited();
            this._currentPoint = null;
          }
          return;
        }
        if (!this._currentPoint)
        {
          this._currentPoint = pointView;
          pointView.mouseEntered();
          return;
        }
      }