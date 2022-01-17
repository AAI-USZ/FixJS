function startResponse(err, badges) {
    if (err) return next(err);
    var data = computeStats(badges);
    response.render('stats', { stats: data });
  }