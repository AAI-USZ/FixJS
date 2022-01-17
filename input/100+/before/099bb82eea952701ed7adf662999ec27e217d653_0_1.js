function buildModule(context, callback) {
      context.module = config.module(context.module);
      context.fileCache = context.combined ? context.fileCache : {};
      context.moduleCache = {};

      if (context.resource) {
        processResources([context.resource]);
      } else {
        // Load all resources associated with this module
        config.fileList(plugins, context, function(err, resources) {
          if (err) {
            return callback(err);
          }
          processResources(resources);
        });
      }

      function processResources(resources) {
        async.map(resources, function(resource, callback) {
          var resourceContext = context.clone();
          resourceContext.resource = resource;
          plugins.resource(resourceContext, callback);
        },
        function(err, resources) {
          if (err) {
            return callback(err);
          }

          resources = resources.filter(function(resource) { return resource; });

          context.moduleResources = resources;
          plugins.module(context, callback);
        });
      }
    }