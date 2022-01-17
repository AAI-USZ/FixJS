function View(options) {
    if (typeof(options) === 'undefined') {
      options = {};
    }

    if (typeof(options) === 'string') {
      this.selectors = { element: options };
    } else {
      var key;

      if (typeof(options) === 'undefined') {
        options = {};
      }

      for (key in options) {
        if (options.hasOwnProperty(key)) {
          this[key] = options[key];
        }
      }
    }
  }