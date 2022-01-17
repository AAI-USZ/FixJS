function wrapResources(resources, context) {
  ensureModuleTemplates(context);
  var cache = context.moduleCache;
  if (!cache.scopeName) {
    var app = context.config.attributes.application,
        appName = app && app.name;

    if (!appName || context.module.topLevelName || context.config.isAppModule(context.module)) {
      cache.isTopNamespace = true;
      cache.scopeName = context.module.topLevelName || appName || context.module.name;
    } else {
      cache.scopeName = appName + "['" + context.module.name + "']";
    }
    cache.appName = appName;
  }

  // Wrap the module content in a javascript module
  if (resources.length) {
    resources.unshift(generator(moduleStartTemplate({
      isTopNamespace: cache.isTopNamespace,
      name: cache.appName,
      scope: cache.scopeName
    })));
    resources.push(generator(moduleEndTemplate({
      isTopNamespace: cache.isTopNamespace,
      name: cache.appName,
      scope: cache.scopeName
    })));
  }
  return resources;
}