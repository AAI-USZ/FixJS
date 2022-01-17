function(err, uid) {
    if (err) return wsapi.databaseDown(res, err);

    if (typeof uid !== 'number') {
      return fail('no such user');
    }

    db.checkAuth(uid, function(err, hash) {
      if (err) return wsapi.databaseDown(res, err);

      if (typeof hash !== 'string') {
        return fail('no password set for user');
      }

      var startTime = new Date();
      bcrypt.compare(req.body.pass, hash, function (err, success) {
        var reqTime = new Date - startTime;
        statsd.timing('bcrypt.compare_time', reqTime);

        if (err) {
          if (err.indexOf('exceeded') != -1) {
            logger.warn("max load hit, failing on auth request with 503: " + err);
            res.status(503);
            return fail("server is too busy");
          }
          logger.error("error comparing passwords with bcrypt: " + err);
          return fail("internal password check error");
        } else if (!success) {
          return fail("password mismatch for user: " + req.body.email);
        } else {
          if (!req.session) req.session = {};

          wsapi.authenticateSession(req.session, uid, 'password',
                                    req.body.ephemeral ? config.get('ephemeral_session_duration_ms')
                                                       : config.get('authentication_duration_ms'));
          res.json({ success: true, userid: uid });


          // if the work factor has changed, update the hash here.  issue #204
          // NOTE: this runs asynchronously and will not delay the response
          if (config.get('bcrypt_work_factor') != bcrypt.get_rounds(hash)) {
            logger.info("updating bcrypted password for user " + uid);

            // this request must be forwarded to dbwriter, and we'll use the
            // authentication cookie of the user just sent out.
            var u = wsapi.forwardWritesTo;

            var m = u.scheme === 'http' ? http : https;

            var post_body = querystring.stringify({
              oldpass: req.body.pass,
              newpass: req.body.pass,
              csrf: req.body.csrf
            });
            var preq = m.request({
              host: u.host,
              port: u.port,
              path: '/wsapi/update_password',
              method: "POST",
              headers: {
                'Cookie': res._headers['set-cookie'],
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': post_body.length
              }
            }, function(pres) {
              pres.on('end', function() {
                if (pres.statusCode !== 200) {
                  logger.error("failed to update bcrypt rounds of password for " + uid +
                               " dbwriter returns " + pres.statusCode);
                } else {
                  logger.info("bcrypt rounds of password for " + uid +
                              " successfully updated (from " +
                              bcrypt.get_rounds(hash) + " to "
                              + config.get('bcrypt_work_factor') + ")");
                }
              });
            }).on('error', function(e) {
              logger.error("failed to update bcrypt rounds of password for " + uid + ": " + e);
            });

            preq.write(post_body);
            preq.end();
          }
        }
      });
    });
  }