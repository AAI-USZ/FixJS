function(property, propertyValue, attributeValue) {
    return [
      'The ‘' + property + '’ property must be ' + (vowels.indexOf(attributeValue[0]) > -1 ? 'an' : 'a') + ' ‘' + attributeValue + '’.',
      'The type of the property is ‘' + detectType(propertyValue)  + '’'
    ].join(' ');
  }