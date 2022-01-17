function(property, propertyValue, attributeValue) {
    return [
      'The ' + property + ' property must not exceed ' + attributeValue + ' character' + (attributeValue > 1 ? 's' : '')  + '.',
      'The length of the property is ' + propertyValue.length + '.'
    ].join(' ');
  }