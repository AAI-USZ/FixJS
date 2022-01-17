function (err, r) {
    // just verify that we got a JSON object, we don't care about
    // the contents so much
    try {
      if (err) throw err;
      if (!typeof JSON.parse(r.body) === 'object') throw 'bogus response';
    } catch(e) {
      return cb(e.toString() + (r ? (" - " + r.body) : ""));
    }

    crypto.getAssertion({
      now: t,
      secretKey: ctx.keys[email].keyPair.secretKey,
      cert: ctx.keys[email].cert,
      audience: audience,
      email: email
    }, function(err, assertion) {
      if (err) {
        return cb("error getting assertion: " + err);
      }

      wcli.post(cfg, '/verify', {}, {
        audience: assertion.audience,
        assertion: assertion.assertion
      }, function (err, r) {
        try {
          if (err) throw err;
          if (r.code !== 200) throw "non-200 status: " + r.code;
          if (!JSON.parse(r.body).status === 'okay') throw "verification failed with: " + r.reason;
          cb(undefined);
        } catch(e) {
          return cb("can't verify: " + e.toString());
        }
      });
    });
  }