function (x, y) {
      var graphAreaOffset = this.get("graphView").$().offset();
      var padding = this.get("graphView").get("padding");
      var bounds = this._getScreenBounds();
      
      if ((x >= graphAreaOffset.left + padding.left && x <= graphAreaOffset.left + bounds.plotWidth + padding.left) &&
          (y >= graphAreaOffset.top + padding.top  && y <= graphAreaOffset.top + bounds.plotHeight + padding.top)) {
        return true;
      }
      else {
        return false;
      }
    }