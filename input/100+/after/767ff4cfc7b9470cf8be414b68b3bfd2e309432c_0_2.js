function makeResponse(err, badges) {
    if (err) return next(err);
    data = computeStats(badges);
    response.render('stats', {
      stats: data,
    });
  }