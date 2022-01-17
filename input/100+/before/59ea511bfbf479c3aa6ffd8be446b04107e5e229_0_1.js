function (path, callback) {
          var results = [],
          REQUEST_CONCURRENCY_DELAY = 200,
          callbacks = 0
          self = this;
          //
          // Remark: REQUEST_CONCURRENCY_DELAY represents the millisecond,
          // delay between outgoing requests to dropbox
          //
          function load (path) {
            callbacks++;
            //
            // Give the dropbox API a delay between requests,
            // by wrapping each depth level in a setTimeout delay
            //
            setTimeout(function(){
              self.client.metadata(path, function (status, reply) {
                //
                // If we have found any contents on this level of the folder
                //
                if (reply.contents) {
                  reply.contents.forEach(function (item) {
                    //
                    // Add the item into our results array
                    //
                    results.push(item.path);
                    //
                    // If we have encountered another folder, we are going to recurse on it
                    //
                    if (item.is_dir) {
                      load(item.path);
                    }
                  });
                }
                callbacks--;
                if (callbacks === 0) {
                  callback(status, results);
                }
              });
            }, REQUEST_CONCURRENCY_DELAY)
          }
          console.log('warn: recursively loading data from dropbox...this may take some time');
          load(path, results);
        }