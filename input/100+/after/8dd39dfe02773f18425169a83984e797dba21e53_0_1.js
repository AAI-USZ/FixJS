function(err, resources) {
    // TODO handle file system ENOENT, send all else to ctx.done
    // if(err) return ctx.done(err);

    var resource
      , id = ctx.url && ctx.url.replace('/', '').replace('r', '')
    
    if(ctx.url === '/types') {
      loadTypes(function(defaults, types) {
        Object.keys(types).forEach(function(key) {
          defaults[key] = types[key];
        });
        Object.keys(defaults).forEach(function(key) {
          if(excludedTypes[key]) return;
          var c = defaults[key];
            
          defaults[key] = {
            type: c.name,
            defaultPath: c.defaultPath,
            label: c.label
          };
        });
        ctx.done(err, defaults);
      })
      return;
    }

    resources = resources || {};


    switch (ctx.req.method) {
      case 'POST':
        resource = ctx.body;
        id = uuid.create();
        resources[id] = resource;

        config.saveConfig(resources, basepath, function(err) {
          resource.id = id;
          ctx.done(err, resource);
        });
        break;
      case 'PUT':
        resource = ctx.body;
        delete resource.id;
        if (!resources[id]) {
          return next();
        }
        resources[id] = ctx.body;
        
        notifyType(resources[id], ctx, function (err) {
          config.saveConfig(resources, basepath, function (err) {
            ctx.done(err, ctx.body);
          });
        });
        break;
      case 'GET':
        if(id) {
          if (!resources[id]) {
            return next();
          }
          r = resources[id];
        } else {
          var r = Object.keys(resources).map(function(k, i) {
            var r = resources[k];
            r.id = k;
            return r;
          });
        }

        ctx.done(null, r);
        break;
      case 'DELETE':
        if (!resources[id]) {
          return next();
        }
        var r = resources[id];
        delete resources[id];
        config.saveConfig(resources, basepath, function(err) {
          notifyType(r, ctx, ctx.done);
        });
        break;
      default:
        next();
    }
  }