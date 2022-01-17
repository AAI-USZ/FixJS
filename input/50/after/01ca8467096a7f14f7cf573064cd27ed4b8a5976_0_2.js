function(value) {
    if (value === null) {
      return '';
    }
    return this.strip(value.toString().toLowerCase()).replace(/\W+/g, '_').replace(/_+$/g, '');
  }