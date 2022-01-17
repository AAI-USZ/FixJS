function(err, code) {
          if (err != null) {
            return this.skip();
          } else {
            compile(code, opts, this.local.path, this.next);
            if (opts.compiler != null) {
              if ((opts.docs != null) && (opts.template != null)) {
                generateDoc(code, opts, this.local.path);
              }
              return this.global.filepaths.push(this.local.path);
            }
          }
        }