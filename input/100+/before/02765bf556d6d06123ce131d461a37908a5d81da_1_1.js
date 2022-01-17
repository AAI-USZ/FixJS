function (x, y) {
      var inputAreaOffset = this.get("graphView").get("inputAreaView").$().offset();
      var bounds = this._getScreenBounds();
      if ((x >= inputAreaOffset.left && x <= inputAreaOffset.left + bounds.plotWidth) &&
          (y >= inputAreaOffset.top  && y <= inputAreaOffset.top + bounds.plotHeight)) {
        return true;
      }
      else {
        return false;
      }
    }