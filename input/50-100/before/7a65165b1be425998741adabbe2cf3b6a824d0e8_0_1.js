function write(view, truthy) {
    ASSERT(view instanceof jQuery, "expected jQuery object");

    if (!!truthy) {
      if (view.is(":empty")) {
        var render = view.data(hdRenderName);
        var copy = render();
        view.append(copy);
      }
    } else {
      /* TODO: Unbind. */
      view.empty();
    }
  }