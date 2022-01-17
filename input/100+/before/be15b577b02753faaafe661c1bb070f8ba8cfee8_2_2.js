function genKey(cb) {
    if (ctx.keys && ctx.keys[email]) {
      cb();
    } else {
      var keypair = userdb.addKeyToUserCtx(ctx, email);
        // and now let's certify the pubkey
        wcli.post(cfg, '/wsapi/cert_key', ctx, {
          email: email,
          pubkey: keypair.publicKey.serialize()
        }, function(err, resp) {
          try {
            if (err) throw err;
            if (resp.code !== 200) throw "non-200 status: " + resp.code +
              + " - " + resp.body;
            if (typeof resp.body !== 'string') throw cb("no response body");
            userdb.addCertToUserCtx(ctx, email, resp.body);
            cb();
          } catch(e) {
            cb("can't certify key" + (e ? (": " + e.toString()) : ""));
          }
        });
    }
  }