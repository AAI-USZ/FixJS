function() {
  var counter = mongo.collection('counter'),
      promise = new Promise();

  counter.findAndModify({tbl: 'links'}, [], {$inc: {c: 1}}, {safe: true, "new": true },
      function(err, result) {

        if (err) {
          // Database error
          promise.reject({
            message: 'Database error incrementing links counter',
            error: err,
            code: 500
          });

        } else if (result && result.c && typeof result.c === 'number') {
          // Success, resolve the promise
          promise.resolve(result.c);

        } else {
          // Bad data returned from the database
          promise.reject({
            message: 'Incrementing counter link did not return a number',
            error: result,
            code: 500
          });
        }
      }
  );

  return promise;
}