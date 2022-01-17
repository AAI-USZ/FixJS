function() {
          var r;
          try {
            if (pres.statusCode !== 200) throw "non-200 response: " + pres.statusCode;
            r = JSON.parse(respBody);
            if (!r.success) throw "non-success response from dbwriter";
            if (!r.userid) throw "malformed response from dbwriter";
          } catch(e) {
            logger.error("failed to create primary user with assertion for " + email + ": " + e);
            return res.json({ success: false, reason: "internal error creating account" });
          }

          logger.info("successfully created primary acct for " + email + " (" + r.userid + ")");
          wsapi.authenticateSession({session: req.session, uid: r.userid,
                                     level: 'assertion',
                                     duration_ms: req.params.ephemeral ?
                                     config.get('ephemeral_session_duration_ms')
                                     : config.get('authentication_duration_ms')
                                     }, function (err) {
            if (err) return wsapi.databaseDown(res, err);
            res.json({ success: true, userid: r.userid });
          });
        }