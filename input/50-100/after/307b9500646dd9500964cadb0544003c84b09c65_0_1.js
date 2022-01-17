function(req, res) {
    var start = new Date();

    statsd.increment('routes.error.get');

    res.render('error', {
      browserid_server: config.get('browserid_server'),
      claimed: session.getClaimedEmail(req),
      layout: false
    });

    statsd.timing('routes.error', new Date() - start);
  }