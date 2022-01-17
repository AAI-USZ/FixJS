function stats(request, response, next) {
  var user = request.user;
  var adminUsers = configuration.get('admins');

  if (!user)
    return response.send('Must be logged in', 403);

  if (adminUsers.indexOf(user.get('email')) < 0)
    return response.send('Must be an admin user', 403);

  logger.info(user.get('email') + ' is accessing /stats');

  function computeStats(badges) {
    var totalBadges = badges.length;
    var totalPerIssuer = {};

    _.each(badges, function(b) {
      var issuerName = b.attributes.body.badge.issuer.name || 'No Issuer Name';
      if (totalPerIssuer[issuerName]) {
        totalPerIssuer[issuerName]++;
      } else {
        totalPerIssuer[issuerName] = 1;
      }
    });

    // transform the total_per_issuer object into a nicer array for display
    var niceTotalPerIssuer = _.map(totalPerIssuer, function(v,k) {
      return {name: k, total: v};
    });

    return {
      totalBadges: totalBadges,
      totalPerIssuer: niceTotalPerIssuer
    }
  }

  function getBadges() {
    Badge.findAll(makeResponse);
  }

  function makeResponse(err, badges) {
    if (err) return next(err);
    var data = computeStats(badges);
    response.render('stats', {
      stats: data
    });
  }

  var startResponse = getBadges;
  return startResponse();

}