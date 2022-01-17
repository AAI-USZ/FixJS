function(err) {
        if (err) {
          console.error(err);
          return process.exit(1);
        } else {
          console.log("OK");
          return process.exit();
        }
      }