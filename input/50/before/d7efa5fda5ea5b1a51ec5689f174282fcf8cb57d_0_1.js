function setFrontHeight(element) {
    var height = element.height();
    element.css({ height: height + 'px' }).attr('data-original-height', height);
  }