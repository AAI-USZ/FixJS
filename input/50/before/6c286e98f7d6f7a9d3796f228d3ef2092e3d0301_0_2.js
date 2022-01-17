function(value) {
    if (value === null) {
      return '';
    }
    return value.replace(/\W+/g, '_').replace(/[^\W]$/, '');
  }