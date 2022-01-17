function (indexName, options, callback) {
  var self = this
    , queryOptions = { 'query' : utils.buildRavenQuery(options.query) }
    ;

  self.httpClient.get('indexes/' + indexName, queryOptions, function (error, result) {
    // If nonstale results requested, then check to see if they are
    if (!error && result.statusCode === 200 && options.waitForNonStaleResults) {
      var data = result.asJson();
      if (data.IsStale) {
        // Simply wait some time and requery
        return setTimeout(function () {
          self.queryIndex(indexName, options, callback);
        }, 500);
      } else {
        return callback && callback(error, { result: data, response: result });
      }
    }

    // If we don't care about stale results, then just return
    return callback && callback(error, { result: result.statusCode === 200 ? result.asJson() : null, response: result });
  });
}