function(req, res) {
  if(!req.facebook) {
    res.render('appauth', {title: 'Authentication'});
  } else {
    var fbid = req.facebook.signed_request.user_id;
    res.expose({fbid: fbid}, "lambdaracer.current");

    res.render('index', { title: 'Racer' });
  }
}