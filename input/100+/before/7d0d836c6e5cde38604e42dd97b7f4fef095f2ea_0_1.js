function(thisContext, path, options) {
    var inverse = options.inverse,
        data = options.data,
        view = data.view,
        fn = options.fn,
        hash = options.hash,
        newView;

    if ('string' === typeof path) {
      newView = EmberHandlebars.getPath(thisContext, path, options);
      Ember.assert("Unable to find view at path '" + path + "'", !!newView);
    } else {
      newView = path;
    }

    Ember.assert(Ember.String.fmt('You must pass a view class to the #view helper, not %@ (%@)', [path, newView]), Ember.View.detect(newView));

    var viewOptions = this.propertiesFromHTMLOptions(options, thisContext);
    var currentView = data.view;
    viewOptions.templateData = options.data;

    if (fn) {
      Ember.assert("You cannot provide a template block if you also specified a templateName", !get(viewOptions, 'templateName') && !get(newView.proto(), 'templateName'));
      viewOptions.template = fn;
    }

    // We only want to override the `_context` computed property if there is
    // no specified controller. See View#_context for more information.
    if (!newView.proto().controller && !newView.proto().controllerBinding && !viewOptions.controller && !newView.controllerBinding) {
      viewOptions._context = thisContext;
    }

    currentView.appendChild(newView, viewOptions);
  }