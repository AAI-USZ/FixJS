function bindTextbox(view, options) {
    var hdtSaved = HOTDRINK_DEBOUNCE_THRESHOLD;
    var value;
    
    if (typeof options === "object") {
      value = options.value;
      if (options.debounce) {
        HOTDRINK_DEBOUNCE_THRESHOLD = options.debounce;
      }
    } else {
      value = options;
    }

    subbind(view, value);

    HOTDRINK_DEBOUNCE_THRESHOLD = hdtSaved;
  }