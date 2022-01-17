function(property, propertyValue, attributeValue) {
    return [
      'The ‘' + property + '’ property must be a/an ‘' + attributeValue + '’.',
      'The type of the property is ‘' + detectType(propertyValue)  + '’'
    ].join(' ');
  }