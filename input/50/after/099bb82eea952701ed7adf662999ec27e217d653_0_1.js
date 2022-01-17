function(err, newResource) {
            if (newResource && newResource !== resource) {
              newResource.originalResource = resource;
            }

            callback(err, newResource);
          }