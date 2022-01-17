function(err, stats) {
      if (err != null) {
        return this.skip();
      } else {
        if (!stats.isDirectory()) {
          return this.skip();
        } else {
          info("start watching directory: " + (String(dir).bold));
          fs.watch(dir, function(event, filename) {
            return onDirChanged(opts);
          });
          return fs.readdir(dir, this.next);
        }
      }
    }