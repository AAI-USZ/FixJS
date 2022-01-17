function (data) {
    var // body is a simple string
        // head is a list of strings like `<link href=...` and so on
        out = {body: view(data), head: []};

    if (layouts && layouts.length) {
      _.each(layouts.slice().reverse(), function (path) {
        var fn = find_path(nodeca.runtime.views[locale][theme].layouts, path);

        if (!_.isFunction(fn)) {
          nodeca.logger.warn("Layout " + path + " not found");
          return;
        }

        data.content = out.body;
        out.body = fn(data);
      });
    }

    // TODO: fill in out.head

    return out;
  }