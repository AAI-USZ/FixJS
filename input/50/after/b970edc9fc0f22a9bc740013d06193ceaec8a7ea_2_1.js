function (file) {
      if (file.match(new RegExp('\.' + self.ext))) {
        _task(base, file);
      }
    }