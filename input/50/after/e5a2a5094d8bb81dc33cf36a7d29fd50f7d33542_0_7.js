function() {
    var value = input.val();
    element.text(value);
    if (typeof finished == 'function') {
      finished(value, element);
    }
  }