function(element) {
    if (element.length == 0)
      return false;
    var name = element[0].nodeName.toLowerCase();
    return name == 'input' || name == 'select' || name == 'textarea';
  }