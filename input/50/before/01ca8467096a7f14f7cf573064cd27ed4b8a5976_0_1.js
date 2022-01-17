function(value) {
    if (value === null) {
      return '';
    }
    return value.toString().toLowerCase().replace(/\W+/g, '_').replace(/[^\W]$/, '');
  }