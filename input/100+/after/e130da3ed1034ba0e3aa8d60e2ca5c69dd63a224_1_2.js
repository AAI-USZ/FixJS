function (options) {
    var date = null;
    if (typeof exports !== 'undefined') {
      date = require('../src/date');
    } else {
      date = root.timezoneJS;
    }
    return init(date, options);
  }