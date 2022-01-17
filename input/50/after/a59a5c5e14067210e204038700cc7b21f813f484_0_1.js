function(err, contents) {
        try {
          done(_.template(contents.toString()));
        } catch (ex) {
          console.log("Unable to locate file: " + path);
        }
      }