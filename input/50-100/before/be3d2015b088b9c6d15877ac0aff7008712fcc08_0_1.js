function(element, className) {
    if (supportsClassList) {
      return element.classList.add(className);
    }
    if (api.hasClass(element, className)) {
      return;
    }
    element.className += " " + className;
  }