function (err, success) {
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

      logger.info("updating password for user " + req.session.userid);
      wsapi.bcryptPassword(req.params.newpass, function(err, hash) {
        if (err) {
          if (err.indexOf('exceeded') != -1) {
            logger.warn("max load hit, failing on auth request with 503: " + err);
            res.status(503);
            return res.json({ success: false, reason: "server is too busy" });
          }
          logger.error("error bcrypting password for password update for user " + req.session.userid, err);
          return res.json({ success: false });
        }

        db.updatePassword(req.session.userid, hash, function(err) {
          var success = true;
          if (err) {
            logger.error("error updating bcrypted password for user " + req.session.userid, err);
            wsapi.databaseDown(res, err);
          } else {
            res.json({ success: success });
          }
        });
      });
    }