function(err, contents) {
        done(_.template(contents.toString()));
      }