function(app) {

  /*
  * GET /403 page.
  */
  app.get('/403', function NotAllowed(req, res, next) {
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
  });

  /*
  * GET /404 page.
  */
  app.get('/404', function NotFound(req, res, next) {
    // respond with html page
    if (req.accepts('html')) {
      res.status(404);
      res.render('404', { url: req.url });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

}