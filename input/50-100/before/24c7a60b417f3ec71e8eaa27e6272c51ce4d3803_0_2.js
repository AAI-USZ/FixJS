function (err, r) {
        try {
          if (err) throw err;
          if (r.code !== 200) throw "non-200 status: " + r.code;
          if (!JSON.parse(r.body).status === 'okay') throw "verification failed with: " + r.reason;
          cb(undefined);
        } catch(e) {
          return cb("can't verify: " + e.toString());
        }
      }