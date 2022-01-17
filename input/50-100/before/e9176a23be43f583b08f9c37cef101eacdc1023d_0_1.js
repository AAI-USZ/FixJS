function(e, r) {
        if (typeof e === "function" ? e(console.log("Error in saveApp: " + e)) : void 0) {

        } else {
          console.log("Finished saving app: " + r);
        }
        return cb(e, r);
      }