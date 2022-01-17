function(attribute, value) {
    // Only allow Strings to be an object
    if(typeof value === 'object') value = value.join(' ');

    return attribute + '="' + value + '"';
  }