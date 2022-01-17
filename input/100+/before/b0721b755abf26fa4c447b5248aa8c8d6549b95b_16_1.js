function(req, res) {
  var email = req.query.email;

  try {
    sanitize(email).isEmail();
  } catch(e) {
    var msg = "invalid arguments: " + e;
    logger.warn("bad request received: " + msg);
    return httputils.badRequest(res, msg);
  }

  // if the email is in the staged table, we are not complete yet.
  // if the email is not in the staged table -
  //   * if we are authenticated as the owner of the email we're done
  //   * if we are not authenticated as the owner of the email, we must auth
  db.isStaged(email, function(err, staged) {
    if (err) wsapi.databaseDown(res, err);
    
    if (staged) {
      return res.json({ status: 'pending' });
    } else {
      if (wsapi.isAuthed(req, 'assertion')) {
        db.userOwnsEmail(req.session.userid, email, function(err, owned) {
          if (err) wsapi.databaseDown(res, err);
          else if (owned) res.json({ status: 'complete', userid: req.session.userid });
          else res.json({ status: 'mustAuth' });
        });
      } else {
        return res.json({ status: 'mustAuth' });
      }
    }
  });
}