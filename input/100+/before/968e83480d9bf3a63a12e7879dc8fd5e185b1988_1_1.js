function(data) {
  var url = data.url,
      client = data.client || 'Unknown',
      userAgent = data.userAgent || 'Unknown',
      id = transform.uriToLinkID(url),
      promise = new Promise(),
      badIDMessage = 'Missing or invalid URI',
      dbPromise;

  if (id) {
    dbPromise = db.addNewLinkHit(id, { date: new Date(), client: client, userAgent: userAgent });

    dbPromise.then(function(longLink) {

      // Added the link successfully
      promise.resolve(longLink);

      // Log activity
      db.logActivity({ message: 'Link hit', linkID: id }).then(null, function(err) {

        // Problem logging the activity, write to the error log
        // Already resolved the client promise though, so just ignore it
        db.logError({
          message: 'Database error writing to the activity log',
          error: err.error,
          code: err.code
        }).then(null, throwImmediately);
      });

    }, function(err) {
      err = err || {};
      promise.reject(err.message || 'Database error', err.code || 500);
      db.logError(err).then(null, throwImmediately);
    });

  } else {
    // Invalid ID
    promise.reject(badIDMessage, 404);
    db.logError({
      message: badIDMessage,
      url: url,
      client: client,
      code: 404
    }).then(null, throwImmediately);
  }

  return promise;
}