function(err, uid) {
          if (err) return wsapi.databaseDown(res, err);
          if (!uid) return res.json({ success: false, reason: "internal error" });
          wsapi.authenticateSession(req.session, uid, 'assertion',
                                    req.body.ephemeral ? config.get('ephemeral_session_duration_ms')
                                                       : config.get('authentication_duration_ms'));
          return res.json({ success: true, userid: uid });
        }