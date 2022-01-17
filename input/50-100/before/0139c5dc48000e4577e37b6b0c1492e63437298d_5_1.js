function bind(model, elts) {
    if (!elts) elts = $('body');
    if (!(elts instanceof jQuery)) elts = $(elts);
    LOG("Binding " + elts.attr("id"));
    subbind(elts, model);
  }