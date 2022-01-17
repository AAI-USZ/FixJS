function bindIfOrIfNot(view, variable, context, writer) {
    ASSERT(view instanceof jQuery, "expected jQuery object");

    var template = view.contents().detach();

    view.data(hdRenderName, function renderIf() {
      var copy = template.clone();
      hd.bindTree(copy, context);
      return copy;
    });

    hd.bindWrite(variable, view, writer);

    /* Stop recursion. */
    return true;
  }