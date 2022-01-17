function(err, hash) {
            if (err) {
              logger.warn("couldn't bcrypt password during email verification: " + err);
              return;
            }
            db.updatePassword(uid, hash, function(err) {
              if (err) {
                logger.warn("couldn't update password during email verification: " + err);
              }
            });
          }