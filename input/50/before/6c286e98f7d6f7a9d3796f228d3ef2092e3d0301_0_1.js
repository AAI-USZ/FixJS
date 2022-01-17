function(value) {
    if (value === null) {
      return '';
    }
    return value.replace(injection_rx, "\\$1");
  }