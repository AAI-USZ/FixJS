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
  }

  // Wrap the module content in a javascript module
  resources.unshift(generator(moduleStartTemplate({scope: cache.scopeName})));
  resources.push(generator(moduleStartTemplate({scope: cache.scopeName})));
  return resources;
}