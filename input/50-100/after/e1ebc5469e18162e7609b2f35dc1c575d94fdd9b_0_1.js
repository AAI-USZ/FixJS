function writeText(view, value) {
    ASSERT(view instanceof jQuery, "expected jQuery object");
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    /* Encode HTML entities. */
    value = view.text(value).html();
    view.html(value.replace(/\n/g,"<br />"));
  }