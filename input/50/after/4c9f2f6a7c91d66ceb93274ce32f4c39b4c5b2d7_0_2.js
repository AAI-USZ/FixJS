function(property, propertyValue, attributeValue) {
    return [
      'The ' + property + ' property must be exactly ' + attributeValue + ' character' + (attributeValue > 1 ? 's' : '')  + '.',
      'The length of the property is ' + propertyValue.length + '.'
    ].join(' ');
  }