function(options, thisContext) {
    var hash = options.hash, data = options.data;
    var extensions = {},
        classes = hash['class'],
        dup = false;

    if (hash.id) {
      extensions.elementId = hash.id;
      dup = true;
    }

    if (classes) {
      classes = classes.split(' ');
      extensions.classNames = classes;
      dup = true;
    }

    if (hash.classBinding) {
      extensions.classNameBindings = hash.classBinding.split(' ');
      dup = true;
    }

    if (hash.classNameBindings) {
      if (extensions.classNameBindings === undefined) extensions.classNameBindings = [];
      extensions.classNameBindings = extensions.classNameBindings.concat(hash.classNameBindings.split(' '));
      dup = true;
    }

    if (hash.attributeBindings) {
      Ember.assert("Setting 'attributeBindings' via Handlebars is not allowed. Please subclass Ember.View and set it there instead.");
      extensions.attributeBindings = null;
      dup = true;
    }

    if (dup) {
      hash = Ember.$.extend({}, hash);
      delete hash.id;
      delete hash['class'];
      delete hash.classBinding;
    }

    // Set the proper context for all bindings passed to the helper. This applies to regular attribute bindings
    // as well as class name bindings. If the bindings are local, make them relative to the current context
    // instead of the view.
    var path;

    // Evaluate the context of regular attribute bindings:
    for (var prop in hash) {
      if (!hash.hasOwnProperty(prop)) { continue; }

      // Test if the property ends in "Binding"
      if (Ember.IS_BINDING.test(prop) && typeof hash[prop] === 'string') {
        path = this.contextualizeBindingPath(hash[prop], data);
        if (path) { hash[prop] = path; }
      }
    }

    // Evaluate the context of class name bindings:
    if (extensions.classNameBindings) {
      for (var b in extensions.classNameBindings) {
        var full = extensions.classNameBindings[b];
        if (typeof full === 'string') {
          // Contextualize the path of classNameBinding so this:
          //
          //     classNameBinding="isGreen:green"
          //
          // is converted to this:
          //
          //     classNameBinding="bindingContext.isGreen:green"
          var parsedPath = Ember.View._parsePropertyPath(full);
          path = this.contextualizeBindingPath(parsedPath.path, data);
          if (path) { extensions.classNameBindings[b] = path + parsedPath.classNames; }
        }
      }
    }

    // Make the current template context available to the view
    // for the bindings set up above.
    extensions.bindingContext = thisContext;

    return Ember.$.extend(hash, extensions);
  }