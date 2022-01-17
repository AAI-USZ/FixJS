function errorHandler(err, req, res, next) {
    res.statusCode = 500;
    if (dumpExceptions) { console.error(err.stack); }
    var app = res.app;

    if (err instanceof NotFound) {
      res.render('errors/404', { locals: {
        title: '404 - Not Found'
      }, status: 404
    });
    } else {
      res.render('errors/500', {
          title: 'The Server Encountered an Error',
          error: _.escape(err.stack).replace(/\n/g, '<br />'),
          status: 500
      });
    }
  }