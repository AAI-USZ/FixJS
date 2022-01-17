function(err, resp) {
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
        }