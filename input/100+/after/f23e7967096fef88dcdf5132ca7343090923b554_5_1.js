function (data) {
    var html = view(data);

    if (layouts && layouts.length) {
      _.each(layouts.slice().reverse(), function (path) {
        var fn = find_path(nodeca.runtime.views[locale][theme].layouts, path);

        if (!_.isFunction(fn)) {
          nodeca.logger.warn("Layout " + path + " not found");
          return;
        }

        data.content = html;
        html = fn(data);
      });
    }

    return html;
  }