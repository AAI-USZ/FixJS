function(vElement, propertyName) {
      return parseInt(qx.html.Style.getStyleProperty(vElement, propertyName)) || 0;
    }