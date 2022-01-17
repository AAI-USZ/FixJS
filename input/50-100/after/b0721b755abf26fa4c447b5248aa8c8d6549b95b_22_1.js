function(err) {
          var success = true;
          if (err) {
            logger.error("error updating bcrypted password for user " + req.session.userid, err);
            wsapi.databaseDown(res, err);
          } else {
            res.json({ success: success });
          }
        }