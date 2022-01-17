function notifyType(resource, ctx, fn) {
  if(ctx.server) {
    console.log(resource);
    ctx.server.resources.forEach(function(r) {
      console.log(r.settings.path, r.settings.type);
      if(resource.type === r.settings.type && (resource.path === r.settings.path || resource.$renameFrom === r.settings.path) ) {
        debug('notifying resource', r.settings.path);
        r.changed && r.changed(ctx, fn);
        return false;
      }
    });
  } else {
    fn();
  }

}