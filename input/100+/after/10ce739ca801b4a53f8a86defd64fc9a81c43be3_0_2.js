function elementHeightWithMargins(element) {
    element = $(element);
    var height = element.outerHeight()
                 + parseInt(element.css("margin-top"), 10)
                 + parseInt(element.css("margin-bottom"), 10);
    return height;
  }