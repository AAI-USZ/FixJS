function (evt) {
        
        var pointView = this.getPointViewUnderMouse(this.parentView.dataHolder, evt) || null;
        if (!pointView) {
          return;
        }
        
        this._pointView = pointView;
        pointView.mouseEntered();
      }