function (evt) {
        
        var pointView = this.getPointViewUnderMouse(this.parentView.dataHolder, evt) || null;
        if (!pointView || pointView === undefined) {
          return;
        }
        pointView.mouseEntered();
      }