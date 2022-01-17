function(resource, callback) {
          var resourceContext = context.clone();
          resourceContext.resource = resource;
          plugins.resource(resourceContext, callback);
        }