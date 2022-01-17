function(err, urls, publicKey, delegates) {
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
      db.emailKnown(req.params.email, function(err, known) {
        if (err) {
          return wsapi.databaseDown(res, err);
        } else {
          res.json({ type: 'secondary', known: known });
        }
      });
    }
  }