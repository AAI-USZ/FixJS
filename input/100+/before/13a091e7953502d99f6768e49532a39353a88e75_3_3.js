function(res, sout) {
        if (res.newMon) {
          return cb(res.newMon);
        } else {
          throw "ERROR: Monitor mode not enabled? See output:\n'''\n" + sout + "\n'''";
        }
      }