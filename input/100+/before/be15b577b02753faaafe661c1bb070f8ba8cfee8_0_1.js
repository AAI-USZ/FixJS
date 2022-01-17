function (err, r) {
      if (err) return cb(err);
      if (!r || r.code !== 200) return cb("can't get verification secret: non 200 response");

      // and simulate clickthrough
      wcli.post(cfg, '/wsapi/complete_user_creation', context, {
        token: r.body,
        pass: user.password
      }, function (err, r) {
        if (err) {
          return cb(err);
        } else if (r && r.code === 503) {
          return cb("server is too busy");
        } else if (!r || r.code !== 200) {
          return cb("failed to complete user creation");
        }
        try {
          if (JSON.parse(r.body).success !== true) throw "failed";
        } catch(e) {
          return cb("failed to complete user creation (body doesn't have .success === true)");
        }
        // and now let's log in with this email address
        common.authAndKey(cfg, user, context, email, function(err) {
          if (err) return cb(err);
          common.genAssertionAndVerify(cfg, user, context, email, origin, function(err) {
            cb(err);
          });
        });
      });
    }