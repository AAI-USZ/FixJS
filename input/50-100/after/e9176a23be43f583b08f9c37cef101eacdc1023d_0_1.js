function(e, r) {
        if (e != null) {
          console.log("Error in saveApp: " + e);
        } else {
          console.log("Finished saving app: " + r);
        }
        return cb(e, r);
      }