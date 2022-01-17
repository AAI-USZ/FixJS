function showAsBuilding (selector) {
    (function f(i) {
      if (i < (pollIntervalSeconds / fadeIntervalSeconds) - 1) {
        setTimeout(function() {
          $(selector).fadeTo(1000, 0.5).fadeTo(1000, 1);
          f(i + 1);
        }, fadeIntervalSeconds * 1000);
      }
    })(0);
  }