function() {
    // TODO: This is kinda a hack because the component is getting created
    // twice client side. Investigate
    if (!scoped.get()) return;

    var componentDom = component.dom = dom.componentDom(ctx);
    component.create(scoped, componentDom);
  }