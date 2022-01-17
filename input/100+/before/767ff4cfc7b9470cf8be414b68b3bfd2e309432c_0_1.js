function stats(request, response, next) {

  function makeResponse(err, badges) {
    if (err) return next(err);
    prepareBadgeIndex(badges);
    modifyGroups(groups);
    response.render('backpack', {
      error: error,
      success: success,
      badges: badges,
      csrfToken: request.session._csrf,
      groups: groups,
      tooltips: request.param('tooltips')
    });
  }

  
}