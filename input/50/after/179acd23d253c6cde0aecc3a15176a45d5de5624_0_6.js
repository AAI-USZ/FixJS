function(file) {
          this.local.path = getFilepath(file, opts.input);
          return fs.readFile(file, 'utf8', this.next);
        }