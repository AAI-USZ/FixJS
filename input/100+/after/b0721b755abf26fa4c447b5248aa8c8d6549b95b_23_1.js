function(req, res) {
  var email = req.params.email;

  // if the user is authenticated as the user in question, we're done
  if (wsapi.isAuthed(req, 'assertion')) {
    db.userOwnsEmail(req.session.userid, email, function(err, owned) {
      if (err) wsapi.databaseDown(res, err);
      else if (owned) res.json({ status: 'complete', userid: req.session.userid });
      else notAuthed();
    });
  } else {
    notAuthed();
  }

  function notAuthed() {
    // if the user isn't authenticated and there's no pendingCreation token,
    // then they must authenticate
    if (!req.session.pendingCreation) {
      return res.json({ status: 'mustAuth' });
    }

    // if the secret is still in the database, it hasn't yet been verified and
    // verification is still pending
    db.haveVerificationSecret(req.session.pendingCreation, function (err, known) {
      if (err) return wsapi.databaseDown(res, err);

      if (known) return res.json({ status: 'pending' });
      // if the secret isn't known, and we're not authenticated, then the user must authenticate
      // (maybe they verified the URL on a different browser, or maybe they canceled the account
      // creation)
      else {
        delete req.session.pendingCreation;
        res.json({ status: 'mustAuth' });
      }
    });
  }
}