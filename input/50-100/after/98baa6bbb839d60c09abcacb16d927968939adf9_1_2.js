function (err, r) {
        try {
          if (err) throw err;
          if (r.code !== 200) throw "non-200 status: " + r.code;
          var body = JSON.parse(r.body);
          if (body.status !== 'okay') throw "verification failed with: " + body.reason;
          cb(undefined);
        } catch(e) {
          return cb("can't verify: " + e.toString());
        }
      }