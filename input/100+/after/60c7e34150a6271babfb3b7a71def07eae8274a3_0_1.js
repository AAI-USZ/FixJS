function processNamespaceGroups(namespaceGroups, callback) {

    // Use a different compress function for debug
    var compressFunction = options.debug ? copyJavaScript : compressAndWriteJavascript;

    var hash = namespaceGroups.join('|');
    if (options.debug || !namespaceGroupsCache[hash]) {
      async.map(namespaceGroups, compressFunction, function(error, results) {
        if (error) {
          return callback(error);
        }
        results = _.flatten(results);
        // No caching in debug mode
        if (options.debug) {
          namespaceGroupsCache[hash] = results;
        }
        callback(undefined, results);
      });
    } else {
      callback(undefined, namespaceGroupsCache[hash]);
    }
  }