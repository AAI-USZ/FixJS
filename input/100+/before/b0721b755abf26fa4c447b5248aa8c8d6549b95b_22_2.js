function(err, hash) {
    if (err) return wsapi.databaseDown(res, err);

    if (typeof hash !== 'string' || typeof req.body.oldpass !== 'string')
    {
      return res.json({ success: false });
    }

    bcrypt.compare(req.body.oldpass, hash, function (err, success) {
      if (err) {
        if (err.indexOf('exceeded') != -1) {
          logger.warn("max load hit, failing on auth request with 503: " + err);
          res.status(503);
          return res.json({ success: false, reason: "server is too busy" });
        }
        logger.warn("error comparing passwords with bcrypt: " + err);
        return res.json({ success: false });
      }

      if (!success) {
        logger.info("password update fails, incorrect old password");
        return res.json({ success: false });
      }

      logger.info("updating password for email " + req.session.userid);
      wsapi.bcryptPassword(req.body.newpass, function(err, hash) {
        if (err) {
          if (err.indexOf('exceeded') != -1) {
            logger.warn("max load hit, failing on auth request with 503: " + err);
            res.status(503);
            return res.json({ success: false, reason: "server is too busy" });
          }
          logger.error("error bcrypting  password for password update for " + req.body.email, err);
          return res.json({ success: false });
        }

        db.updatePassword(req.session.userid, hash, function(err) {
          var success = true;
          if (err) {
            logger.error("error updating bcrypted password for email " + req.body.email, err);
            wsapi.databaseDown(res, err);
          } else {
            res.json({ success: success });
          }
        });
      });
    });
  }