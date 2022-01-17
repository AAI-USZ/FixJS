function () {
      var elt = $(this);
      if (bindElement(elt, context)) {
        return;
      }
      bindTree(elt.children(), context);
    }