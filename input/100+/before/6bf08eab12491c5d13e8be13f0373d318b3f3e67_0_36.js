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
      var full,
          parts;

      for (var b in extensions.classNameBindings) {
        full = extensions.classNameBindings[b];
        if (typeof full === 'string') {
          if (full.indexOf(':') > 0) {
            // When a classNameBinding contains a colon anywhere after the first character,
            // then the part preceding the colon is a binding path that needs to be
            // contextualized.
            //
            // For example:
            //   classNameBinding="isGreen:green"
            //
            // Will be converted to:
            //   classNameBinding="bindingContext.isGreen:green"

            parts = full.split(':');
            path = this.contextualizeBindingPath(parts[0], data);
            if (path) { extensions.classNameBindings[b] = path + ':' + parts[1]; }

          } else if (full.indexOf(':') === -1 ) {
            // When a classNameBinding doesn't contain any colons, then the entire binding
            // needs to be contextualized.
            //
            // For example:
            //   classNameBinding="myClass"
            //
            // Will be converted to:
            //   classNameBinding="bindingContext.myClass"

            path = this.contextualizeBindingPath(full, data);
            if (path) { extensions.classNameBindings[b] = path; }
          }
        }
      }
    }

    // Make the current template context available to the view
    // for the bindings set up above.
    extensions.bindingContext = thisContext;

    return Ember.$.extend(hash, extensions);
  }