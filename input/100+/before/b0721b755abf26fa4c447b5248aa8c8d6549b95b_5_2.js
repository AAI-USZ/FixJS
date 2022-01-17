function(err, type) {
      if (err) return wsapi.databaseDown(res, err);

      // if this is a known primary email, authenticate the user and we're done!
      if (type === 'primary') {
        return db.emailToUID(email, function(err, uid) {
          if (err) return wsapi.databaseDown(res, err);
          if (!uid) return res.json({ success: false, reason: "internal error" });
          wsapi.authenticateSession(req.session, uid, 'assertion',
                                    req.body.ephemeral ? config.get('ephemeral_session_duration_ms')
                                                       : config.get('authentication_duration_ms'));
          return res.json({ success: true, userid: uid });
        });
      }
      else if (type === 'secondary') {
        logger.error('user logs in with a primary address that was once a secondary, not implemented ('
                     + email + ')');
        return res.json({ success: false });
      }

      // if the user doesn't exist, let's bounce off the dbwriter to have the
      // user + email created
      var u = wsapi.forwardWritesTo;

      var m = u.scheme === 'http' ? http : https;

      var post_body = querystring.stringify({
        assertion: req.body.assertion,
        csrf: req.body.csrf
      });

      var preq = m.request({
        host: u.host,
        port: u.port,
        path: '/wsapi/create_account_with_assertion',
        method: "POST",
        headers: {
          'Cookie': req.headers['cookie'],
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_body.length
        }
      }, function(pres) {
        var respBody = "";
        pres.on('data', function(chunk) {
          respBody += chunk;
        });
        pres.on('end', function() {
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
          wsapi.authenticateSession(req.session, r.userid, 'assertion',
                                    req.body.ephemeral ? config.get('ephemeral_session_duration_ms')
                                                       : config.get('authentication_duration_ms'));
          res.json({ success: true, userid: r.userid });
        });
      }).on('error', function(e) {
        logger.error("failed to create primary user with assertion for " + email + ": " + e);
        res.json({ success: false, reason: "internal error forwarding request" });
      });

      preq.write(post_body);
      preq.end();
    }