function(err, r) {
      if (err) return cb(err);
      try {
        if (r.code !== 200)
            return cb({what: "http error", resp: r}); // report first error
        context.session = JSON.parse(r.body);
        context.sessionStartedAt = new Date().getTime();
        cb(null, context.session.csrf_token);
      } catch(e) {
        console.log('error getting csrf token: ', e);
        cb(e);
      }
    }