function writeFocused(view, truthy) {
    ASSERT(view instanceof jQuery, "expected jQuery object");
    if (truthy) {
      if (!view.is(":focus")) view.focus();
    } else {
      if (view.is(":focus")) view.blur();
    }
  }