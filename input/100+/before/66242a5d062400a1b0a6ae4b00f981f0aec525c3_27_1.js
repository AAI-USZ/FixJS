function getWindowTop(obj) {
      var top;
      top = obj.offsetTop;
      while (!!(obj = obj.offsetParent)) {
        top += obj.offsetTop;
      }
      return top;
    }