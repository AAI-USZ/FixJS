function stats(request, response, next) {
  var user = request.user;
  var adminUsers = configuration.get('admins');

  // access control: foremost we need a logged in user. next we ensure
  // `admins` is defined in the environment config and once we have that
  // we make sure the current user is in that list. for posterity, we
  // log everytime a user accesses the stats page.
  if (!user)
    return response.send('Must be logged in', 403);
  if (!adminUsers)
    return response.send('Not implemented.')
  if (adminUsers.indexOf(user.get('email')) < 0)
    return response.send('Must be an admin user', 403);
  logger.info(user.get('email') + ' is accessing /stats');

  function startResponse(err, badges) {
    if (err) return next(err);
    var data = computeStats(badges);
    response.render('stats', { stats: data });
  }

  function computeStats(badges) {
    var totalBadges = badges.length;
    var issuers = {};

    badges.forEach(function (badge) {
      var assertion = badge.get('body').badge;
      if (!assertion.issuer) return;

      var name = assertion.issuer.name;
      var url = assertion.issuer.origin;

      issuers[name] = issuers[name] || { url: url, total: 0 };
      issuers[name].total++;
    });

    var names = Object.keys(issuers);
    var totalPerIssuer = names.map(function (name) {
      var issuer = issuers[name];
      return { name: name, total: issuer.total, url: issuer.url }
    });

    return {
      totalBadges: totalBadges,
      totalPerIssuer: totalPerIssuer
    }
  }
  return Badge.findAll(startResponse);
}