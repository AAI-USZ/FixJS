function(property, propertyValue, attributeValue) {
    return [
      'The ' + property + ' property must be exactly ' + attributeValue + ' characters.',
      'The length of the property is ' + propertyValue.length + '.'
    ].join(' ');
  }