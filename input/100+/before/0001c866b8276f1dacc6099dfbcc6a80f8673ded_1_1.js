function bindTextbox(view, options) {
    var hdtSaved = HOTDRINK_DEBOUNCE_THRESHOLD;

    if (typeof options === "object") {
      var value = options.value;
      if (options.debounce) HOTDRINK_DEBOUNCE_THRESHOLD = options.debounce;
      if (options.toView || options.toModel || options.validate) {
        value = hd.lens(value);
        if (options.toModel) value.outgoing(options.toModel);
        if (options.validate) value.outgoing(options.validate);
        if (options.toView) value.incoming(options.toView);
      }
    } else {
      var value = options;
    }

    subbind(view, value);

    HOTDRINK_DEBOUNCE_THRESHOLD = hdtSaved;
  }