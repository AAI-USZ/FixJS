function (timeString) {
    var parts = timeString.split(':');

    if (parts.length > 1) {
      return {
        'hours': parseInt(parts[0], 10),
        'minutes': parseInt(parts[1], 10)
      };
    }
  }