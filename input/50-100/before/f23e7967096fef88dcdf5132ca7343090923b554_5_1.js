function (path) {
        var fn = find_path(nodeca.runtime.views[locale][theme].layouts, path);

        if (!_.isFunction(fn)) {
          nodeca.logger.warn("Layout " + path + " not found");
          return;
        }

        data.content = out.body;
        out.body = fn(data);
      }