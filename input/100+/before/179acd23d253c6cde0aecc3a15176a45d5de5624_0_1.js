function(err, template) {
      if (err != null) {
        throw err;
        this.skip();
      } else {
        opts.compiler = jade.compile(template, {
          filename: "templates/docs.jade",
          pretty: true
        });
      }
      return this.next();
    }