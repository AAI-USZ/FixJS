function(linkPayload) {
  var links = mongo.collection('links'),
      promise = new p.Promise();

  links.insert(linkPayload, { safe: true },
    function(err, result) {

      if (err) {

        // Database error
        promise.reject({
          message: 'Database error inserting into links database',
          error: err,
          code: 500
        });

      } else {
        promise.resolve(true);
      }
    }
  )

  return promise;
}