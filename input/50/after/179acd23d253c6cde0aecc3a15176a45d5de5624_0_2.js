function() {
      var dirs;
      dirs = filename.split('/');
      this.global.filename = '';
      return this.next(dirs);
    }