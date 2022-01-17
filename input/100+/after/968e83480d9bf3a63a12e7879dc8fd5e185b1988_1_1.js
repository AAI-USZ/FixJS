function(data) {
  var url = data.url,
      client = data.client || 'Unknown',
      userAgent = data.userAgent || 'Unknown',
      id = transform.uriToLinkID(url),
      promise = new Promise(),
      badIDMessage = 'Missing or invalid URI';

  if (id) {
    db.addNewLinkHit(id, {
      date: new Date(),
      client: client,
      userAgent: userAgent
    }).then(

        function(longLink) {

          // Added the link successfully
          promise.resolve(longLink);

          // Log the new link hit
          logging.log({
            message: 'Link hit',
            linkID: id
          });

        },

        // Some error returned from the database
        function(err) {
          err = err || {};

          err.message = err.message || 'Database error';
          err.code = err.code || 500;

          // Reject the promise
          promise.reject(err.message, err.code);

          // Log the error
          logging.error(err);
        }
    );

  } else {

    // Invalid ID
    promise.reject(badIDMessage, 404);
    logging.error({
      message: badIDMessage,
      url: url,
      client: client,
      code: 404
    });
  }

  return promise;
}