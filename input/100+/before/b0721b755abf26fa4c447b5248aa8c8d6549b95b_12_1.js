function(req, res) {
  var email = req.query.email;

  // check if the currently authenticated user has the email stored under pendingAddition
  // in their acct.
  db.userOwnsEmail(
    req.session.userid,
    email,
    function(err, registered) {
      if (err) {
        wsapi.databaseDown(res, err);
      } else if (registered) {
        delete req.session.pendingAddition;
        res.json({ status: 'complete' });
      } else if (!req.session.pendingAddition) {
        res.json({ status: 'failed' });
      } else {
        db.haveVerificationSecret(req.session.pendingAddition, function (err, known) {
          if (err) {
            return wsapi.databaseDown(res, err);
          } else if (known) {
            return res.json({ status: 'pending' });
          } else {
            delete req.session.pendingAddition;
            res.json({ status: 'failed' });
          }
        });
      }
    });
}