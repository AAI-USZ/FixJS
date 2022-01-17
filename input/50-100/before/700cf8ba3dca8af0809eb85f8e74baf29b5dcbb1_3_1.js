function writeText(view, value) {
    ASSERT(view instanceof jQuery, "expected jQuery object");
    if (typeof value !== "string") value = JSON.stringify(value);
    view.text(value);
  }