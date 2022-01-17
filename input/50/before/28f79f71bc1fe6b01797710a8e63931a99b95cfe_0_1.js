function(element) {
    var height = 0;
    while (element && element.offsetTop) {
      height += element.offsetTop;
      element = element.parentNode;
    }
    return height;
  }