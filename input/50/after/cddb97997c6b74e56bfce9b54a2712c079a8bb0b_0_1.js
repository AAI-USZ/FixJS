function (evt) {
        if (this._pointView && !this._currentPoint.isHovered) {
          this._currentPoint.mouseEntered();
        }
        return;
      }