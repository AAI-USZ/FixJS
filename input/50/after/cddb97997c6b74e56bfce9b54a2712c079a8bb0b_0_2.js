function (evt) {
        if (this._pointView) {
          return;
        }
        if (this._currentPoint) {
          this._currentPoint.mouseExited();
          this._currentPoint = null;
        }
        return;
      }