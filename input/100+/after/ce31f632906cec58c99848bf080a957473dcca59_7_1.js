function(err, urls, publicKey, delegates) {
    if (done) {
      return;
    }
    done = true;
    if (err) {
      logger.info('"' + m[1] + '" primary support is misconfigured, falling back to secondary: ' + err);
      // primary check failed, fall back to secondary email verification
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