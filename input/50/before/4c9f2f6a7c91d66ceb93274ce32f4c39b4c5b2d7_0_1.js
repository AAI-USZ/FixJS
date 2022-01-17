function(property, propertyValue, attributeValue) {
    return [
      'The ' + property + ' property must not exceed ' + attributeValue + ' characters.',
      'The length of the property is ' + propertyValue.length + '.'
    ].join(' ');
  }