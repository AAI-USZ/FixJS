function(req, callback) {
      var results = {};
      var url;
      var root;
      var collection;
      var self = this;
      var resources;

      if ('multistatus' in this.sax.root) {
        root = this.sax.root.multistatus;

        for (url in root) {
          collection = root[url];

          resources = collection.resourcetype;

          if (resources.value.forEach) {

            resources.value.forEach(function(type) {
              if (type in self._resources) {

                if (!(type in results)) {
                  results[type] = {};
                }

                results[type][url] = new self._resources[type](
                  self.connection,
                  collection
                );
              }
            });
          }
        }

        callback(null, results, req);

      } else {
        //XXX: Improve error handling
        callback(
          new Error('unexpected xml result'),
          this.sax.root, req
        );
      }
    }