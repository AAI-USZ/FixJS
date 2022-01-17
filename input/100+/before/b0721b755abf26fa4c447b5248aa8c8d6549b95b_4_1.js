function(req, res) {
  // parse out the domain from the email
  var email = url.parse(req.url, true).query['email'];
  var m = emailRegex.exec(email);
  if (!m) {
    return httputils.badRequest(res, "invalid email address");
  }
  // Saftey value for production branch only
  var done = false;
  primary.checkSupport(m[1], function(err, urls, publicKey, delegates) {
    if (done) {
      return;
    }
    done = true;
    if (err) {
      logger.warn('error checking "' + m[1] + '" for primary support: ' + err);
      return httputils.serverError(res, "can't check email address");
    }

    if (urls) {
      urls.type = 'primary';
      res.json(urls);
    } else {
      db.emailKnown(email, function(err, known) {
        if (err) {
          return wsapi.databaseDown(res, err);
        } else {
          res.json({ type: 'secondary', known: known });
        }
      });
    }
  });
}