function(req, res) {
  if(!req.facebook || !req.facebook.signed_request || !req.facebook.signed_request.user_id) {
    res.render('appauth', { title: 'Authentication' });
  } else {
    var fbid = req.facebook.signed_request.user_id;
    res.expose({ fbid: fbid }, "lambdaracer.current");

    res.render('index', { title: 'Racer' });
  }
}