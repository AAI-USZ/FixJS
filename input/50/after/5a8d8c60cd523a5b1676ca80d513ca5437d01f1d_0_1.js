function(obj) {
    var curTop = 0;
    if (obj.offsetParent) {
      do {
        curTop += obj.offsetTop;    
      } while (!!(obj = obj.offsetParent));
    }
    return curTop;
  }