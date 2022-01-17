function(err, uid) {
          if (err) return wsapi.databaseDown(res, err);
          if (!uid) return res.json({ success: false, reason: "internal error" });
          wsapi.authenticateSession({session: req.session, uid: uid,
                                     level: 'assertion',
                                     duration_ms: req.params.ephemeral ?
                                     config.get('ephemeral_session_duration_ms')
                                     : config.get('authentication_duration_ms')
                                     }, function(err) {
            if (err) return wsapi.databaseDown(res, err);
            return res.json({ success: true, userid: uid });
          });
        }