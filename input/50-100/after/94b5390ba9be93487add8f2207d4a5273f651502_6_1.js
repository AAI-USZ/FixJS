function(req, res) {
  wsapi.authenticateSession({session: req.session,
                             uid: req.session.userid,
                             level: req.session.auth_level,
                             duration_ms: config.get('authentication_duration_ms')
                             }, function(err) {
                               if (err) return wsapi.databaseDown(res, err);
                               res.send(200);
                             });
}