function cd_nextField(element) {
    // selecting the next input or the save button
    var nextGroup = element.parentNode.nextElementSibling;
    var nextElement = nextGroup.querySelector('input');
    if (nextElement) {
      element = nextElement;
    }

    return element;
  }