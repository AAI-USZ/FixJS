function write(view, value) {
    ASSERT(view instanceof BetterTextbox, "expected a better textbox");
    if (typeof value !== "string") value = JSON.stringify(value);
    view.setText(value);
  }