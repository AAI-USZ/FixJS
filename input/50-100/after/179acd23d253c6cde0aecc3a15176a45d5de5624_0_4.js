function(file) {
          this.local.detail = {
            file: file
          };
          this.global.details.push(this.local.detail);
          return fs.readFile(this.local.detail.file, 'utf8', this.next);
        }