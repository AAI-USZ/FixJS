function(err, hash) {
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
      }