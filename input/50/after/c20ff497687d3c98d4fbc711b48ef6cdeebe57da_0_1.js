function(value) {
    if (value === null) {
      return '';
    }
    return value.toString().replace(/(^ +| +$)/g, '');
  }