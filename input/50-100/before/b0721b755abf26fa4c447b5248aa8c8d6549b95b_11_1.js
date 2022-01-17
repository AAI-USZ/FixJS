function(err, email) {
    if (err) {
      // this should not be an error, the assertion should have already been
      // tested on the webhead
      logger.error('verfication of primary assertion failed unexpectedly dbwriter (' + err + '): ' + req.body.assertion);
      return httputils.serverError(res);
    }

    db.createUserWithPrimaryEmail(email, function(err, uid) {
      if (err) return wsapi.databaseDown(res);
      res.json({ success: true, userid: uid });
    });
  }