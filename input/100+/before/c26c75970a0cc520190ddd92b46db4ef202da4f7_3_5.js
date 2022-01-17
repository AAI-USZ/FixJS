function(options) {
  var links = mongo.collection('links'),
      promise = new p.Promise(),
      pageSize = options.pageSize,
      skipTo = options.page || 0,
      clientID = options.clientID;

  links.find({ clientID: clientID }, {'longLink': 1, 'shortLink': 1, 'hits': 1, 'createDate': 1})
      .sort('createDate', 'desc', null)
      .limit(pageSize, null)
      .skip(pageSize*skipTo, null)
      .toArray(function(err, results) {

        if (err) {
          promise.reject({
            message: 'Error building stats for user ' + clientID,
            error: err,
            code: 500
          });
        } else {
          promise.resolve(results);
        }

      });

  return promise;
}