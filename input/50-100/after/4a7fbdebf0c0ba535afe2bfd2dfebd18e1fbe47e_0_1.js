function() {
    var componentDom = component.dom = dom.componentDom(ctx);

    // TODO: This is a hack to correct for when components get created
    // multiple times during rendering. Should figure out something cleaner
    if (!scoped.get()) return;
    for (name in ctx.$elements) {
      if (!componentDom.element(name)) return;
      break;
    }

    component.create(scoped, componentDom);
  }