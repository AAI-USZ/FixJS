function (err, r) {
      if (err) return cb(err);
      if (r.code !== 200) return cb("can't get verification secret: " + r.code);
      // and simulate clickthrough
      wcli.post(cfg, '/wsapi/complete_user_creation', context, {
        token: r.body,
        pass: user.password,
        ephemeral: false
      }, function (err, r) {
        try {
          if (err) throw err;
          r.body = JSON.parse(r.body);
          if (r.code !== 200 || r.body.success !== true) {
            throw "non-success" + (r.body && r.body.reason ? " (" + r.body.reason + ")" : "");
          }
        } catch(e) {
          return cb("failed to complete user creation: " + e);
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