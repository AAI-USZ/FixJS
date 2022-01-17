function(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
      do {
        curtop += obj.offsetTop;    
      } while (obj = obj.offsetParent);
    }
    return curtop;
  }