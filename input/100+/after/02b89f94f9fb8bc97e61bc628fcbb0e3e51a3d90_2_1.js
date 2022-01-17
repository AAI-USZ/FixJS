function(cfg, user, ctx, email, cb) {
  if (ctx.session && ctx.session.authenticated) {
    cb();
  } else {
    wcli.post(
      cfg, '/wsapi/authenticate_user', ctx,
      { email: email, pass: user.password, ephemeral: false },
      function(err, r) {
        try {
          if (err) throw err;
          if (JSON.parse(r.body).success !== true) {
            throw "non-success response " + r.code + (r.body ? (" - " + r.body) : "");
          }
          ctx.session.authenticated = true;
          cb();
        } catch (e) {
          cb("can't authenticate: " + e);
        }
      }
    );
  }
}