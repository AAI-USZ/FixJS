function(err) {
          var success = true;
          if (err) {
            logger.error("error updating bcrypted password for email " + req.body.email, err);
            wsapi.databaseDown(res, err);
          } else {
            res.json({ success: success });
          }
        }