function(value) {
    element.text(value);
    if (typeof finished == 'function') {
      finished(value, element);
    }
  }