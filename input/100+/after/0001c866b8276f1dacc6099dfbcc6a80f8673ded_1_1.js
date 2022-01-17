function bindTextbox(view, options) {
    var hdtSaved = HOTDRINK_DEBOUNCE_THRESHOLD;

    if (typeof options === "object") {
      var value = options.value;
      if (options.debounce) HOTDRINK_DEBOUNCE_THRESHOLD = options.debounce;
      if (options.toView || options.toModel || options.validate) {
        if (!hd.isScratch(value))
          value = hd.scratch(value);
        if (options.validate) value.validate.prependOutgoing(options.validate);
        if (options.toModel) value.validate.prependOutgoing(options.toModel);
        if (options.toView) value.validate.incoming(options.toView);
      }
    } else {
      var value = options;
    }

    subbind(view, value);

    HOTDRINK_DEBOUNCE_THRESHOLD = hdtSaved;
  }