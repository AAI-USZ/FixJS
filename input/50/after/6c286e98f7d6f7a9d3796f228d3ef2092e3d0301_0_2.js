function(value) {
    if (value === null) {
      return '';
    }
    return value.toString().replace(this.injection_rx, "\\$1");
  }