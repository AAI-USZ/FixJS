function stats(request, response, next) {
//  var user = request.user;
//  var error = request.flash('error');
//  var success = request.flash('success');

  function computeStats(badges) {
    var total_badges = badges.length;
    var total_per_issuer = {};

    _.each(badges, function(b) {
      issuer_name = b.attributes.body.badge.issuer.name || 'No Issuer Name';
      if (_.has(total_per_issuer, issuer_name)) {
        total_per_issuer[issuer_name] = total_per_issuer[issuer_name] + 1;
      } else {
        total_per_issuer[issuer_name] = 1;
      }
    });    
    
    // transform the total_per_issuer object into a nicer array for display
    var nice_total_per_issuer = _.map(total_per_issuer, function(v,k) {
      return {'name':k, 'total':v};
    });

    return {
      'total_badges':total_badges,
      'total_per_issuer': nice_total_per_issuer
    }
  }

  function getBadges() {
    Badge.findAll(makeResponse);
  }

  function makeResponse(err, badges) {
    if (err) return next(err);
    data = computeStats(badges);
    response.render('stats', {
      stats: data,
    });
  }

  var startResponse = getBadges;
  return startResponse();
  
}