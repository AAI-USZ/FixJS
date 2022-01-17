function(r) {
      if(resource.type === r.settings.type && resource.path === r.settings.path) {
        r.changed && r.changed(ctx, fn);
        return false;
      }
    }