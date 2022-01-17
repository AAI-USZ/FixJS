function(req, res) {
  var email = req.params.email;

  db.removeEmail(req.session.userid, email, function(error) {
    if (error) {
      logger.warn("error removing email " + email);
      if (error === 'database connection unavailable') {
        wsapi.databaseDown(res, error);
      } else {
        httputils.badRequest(res, error.toString());
      }
    } else {
      res.json({ success: true });
    }});
}