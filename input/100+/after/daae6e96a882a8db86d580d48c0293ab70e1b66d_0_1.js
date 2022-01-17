function(options) {
    options = options || {};
    var path = '';

    if(options.controller) {
      // Normalize controller name
      options.controller = utils.string.underscorize(options.controller);

      path += '/' + options.controller;

      if(!options.action && !options.id) options.action = 'index';
      if(options.action === 'index') {
        if(options.trailingSlash) path += '/';
        return path;
      }
    }
    if(options.id) {
      // If no controller is given attempt to get the current one
      if(!options.controller && Data.params.controller) {
        var controller = Data.params.controller[0].toLowerCase() +
          Data.params.controller.slice(1, Data.params.controller.length);

        options.controller = controller;
        path += '/' + controller;
      }
      path += '/' + options.id;

      if(!options.action) options.action = 'show';
      if(options.action === 'show') {
        if(options.trailingSlash) path += '/';
        return path;
      }
    }
    if(options.action) {
      path += '/';

      // If no controller is given attempt to get the current one
      if(!options.controller && Data.params.controller) {
        var controller = Data.params.controller[0].toLowerCase() +
          Data.params.controller.slice(1, Data.params.controller.length);

        options.controller = controller;
        path += controller + '/';
      }

      if(options.action === 'show') {
        if(options.trailingSlash) path += '/';
        return path;
      } else {
        path += options.action;
        if(options.trailingSlash) path += '/';
      }
    }

    return path;
  }