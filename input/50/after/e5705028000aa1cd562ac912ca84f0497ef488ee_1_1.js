function(attribute, value) {
    // If value is an Array join them with a space
    if(typeof value === 'object' && value instanceof Array) {
      value = value.join(' ');
    }

    return attribute + '="' + value + '"';
  }