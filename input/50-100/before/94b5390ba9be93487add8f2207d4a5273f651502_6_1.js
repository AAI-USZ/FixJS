function(req, res) {
  wsapi.authenticateSession(req.session, req.session.userid, req.session.auth_level,
                            config.get('authentication_duration_ms'));
  res.send(200);
}