function(context, options) {
  if (arguments.length === 4) {
    var keywordName, path, rootPath, normalized;

    Ember.assert("If you pass more than one argument to the with helper, it must be in the form #with foo as bar", arguments[1] === "as");
    options = arguments[3];
    keywordName = arguments[2];
    path = arguments[0];

    Ember.assert("You must pass a block to the with helper", options.fn && options.fn !== Handlebars.VM.noop);

    if (Ember.isGlobal(path)) {
      Ember.bind(options.data.keywords, keywordName, path);
    } else {
      normalized = normalizePath(this, path, options.data);
      path = normalized.path;
      rootPath = normalized.root;

      // This is a workaround for the fact that you cannot bind separate objects
      // together. When we implement that functionality, we should use it here.
      var contextKey = Ember.$.expando + Ember.guidFor(rootPath);
      options.data.keywords[contextKey] = rootPath;

      // if the path is '' ("this"), just bind directly to the current context
      var contextPath = path ? contextKey + '.' + path : contextKey;
      Ember.bind(options.data.keywords, keywordName, contextPath);
    }

    return bind.call(this, path, options.fn, true, function(result) {
      return !Ember.none(result);
    });
  } else {
    Ember.assert("You must pass exactly one argument to the with helper", arguments.length === 2);
    Ember.assert("You must pass a block to the with helper", options.fn && options.fn !== Handlebars.VM.noop);
    return helpers.bind.call(options.contexts[0], context, options);
  }
}