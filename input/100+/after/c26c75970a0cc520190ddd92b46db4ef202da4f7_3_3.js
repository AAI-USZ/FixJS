function(linkID, hitInfo) {
  var links = mongo.collection('links'),
      promise = new Promise();

  links.findAndModify({linkID: linkID}, [], { $push: { hits: hitInfo }}, {safe: true, "new": true},
      function(err, result) {

        if (err) {
          // Database error
          promise.reject({
            message: 'Database error updating resolved link for ID ' + linkID,
            error: err,
            code: 500
          });

        } else if (result && result.longLink) {
          // The long link was found
          promise.resolve(result.longLink);

        } else {
          // The long link was not found
          promise.reject({
            message: 'Missing or invalid URI',
            error: ['Long link for id ', linkID, ' not found'].join(''),
            code: 404
          });

        }
      }
  );

  return promise;
}