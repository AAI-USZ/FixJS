function (name) {
      var path = this.get('path');
      if (this.get('Tree').findFolder(path = path.concat(name))) {
        this.set('path', path);
      }
    }