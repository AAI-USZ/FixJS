function bindBetterTextbox(view, options, context) {
    if (!(view instanceof BetterTextbox)) {
      view = new BetterTextbox(view);
    }

    /* Convenience option is to just past the variable for the value, in
     * which case there will be no binding for the editing state. */
    var value = options;

    if (typeof options === "object") {
      value = options.value;
      if (options.editing) hd.binders["focused"](view.tbox, options.editing);
      if (options.focus) {
        view.onFocus(wrapCallback(options.focus, context));
      }
      if (options.edit) {
        view.onEdit(wrapCallback(options.edit, context));
      }
      if (options.blur) {
        view.onBlur(wrapCallback(options.blur, context));
      }
    }

    subbind(view, value);
  }