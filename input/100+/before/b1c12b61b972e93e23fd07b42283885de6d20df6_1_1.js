function createComponent(view, model, ns, name, scope, ctx, macroCtx, macroAttrs) {
  var library = view._libraries.map[ns]
    , Component = library && library.constructors[name]
  
  if (!Component) return false;

  var dom = view.dom
    , scoped = model.at(scope)
    , prefix = scope + '.'
    , component = new Component(scoped)
    , parentFnCtx = model.__fnCtx || ctx.$fnCtx
    , fnCtx, i, key, path, value, instanceName, parent;

  ctx.$fnCtx = model.__fnCtx = parentFnCtx.concat(component);

  for (key in macroCtx) {
    value = macroCtx[key];
    if (path = value && value.$matchName) {
      path = ctxPath(ctx, path);
      model.ref(prefix + key, path, null, true);
      continue;
    }
    if (typeof value === 'function') value = value(ctx, model);
    model.set(prefix + key, value);
  }

  instanceName = scoped.get('name');

  if (component.init) component.init(scoped);

  parent = true;
  for (i = parentFnCtx.length; fnCtx = parentFnCtx[--i];) {
    if (parent) {
      parent = false;
      fnCtx.emit('init:child', component);
    }
    fnCtx.emit('init:descendant', component);
    if (instanceName) {
      fnCtx.emit('init:' + instanceName, component);
    }
  }

  if (view.isServer) return true;

  dom.nextUpdate(function() {
    var parent = true;
    for (i = parentFnCtx.length; fnCtx = parentFnCtx[--i];) {
      if (parent) {
        parent = false;
        fnCtx.emit('create:child', component);
      }
      fnCtx.emit('create:descendant', component);
      if (instanceName) {
        fnCtx.emit('create:' + instanceName, component);
      }
    }
  });

  if (!component.create) return true;

  dom.nextUpdate(function() {
    var componentDom = component.dom = dom.componentDom(ctx);

    // TODO: This is a hack to correct for when components get created
    // multiple times during rendering. Should figure out something cleaner
    if (!scoped.get()) return;
    for (name in ctx.$elements) {
      if (!componentDom.element(name)) return;
      break;
    }

    component.create(scoped, componentDom);
  });

  return true;
}