function bindIf(view, variable, context) {
    ASSERT(view instanceof jQuery, "expected jQuery object");

    var template = view.contents().detach();

    view.data(hdRenderName, function renderIf() {
      var copy = template.clone();
      hd.bindTree(copy, context);
      return copy;
    });

    hd.bindWrite(variable, view, { write: write });

    /* Stop recursion. */
    return true;
  }