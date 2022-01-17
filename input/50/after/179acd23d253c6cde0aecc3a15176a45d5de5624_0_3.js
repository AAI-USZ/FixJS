function(err) {
      if (err == null) {
        info("write file: " + (String(this.global.filename).bold));
      }
      return this.next();
    }