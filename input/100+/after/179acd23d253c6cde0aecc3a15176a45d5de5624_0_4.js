function(err, code) {
          var filepath, i, token, tokens, _i, _len;
          if (err != null) {
            return this.skip();
          } else {
            this.local.detail.code = code;
            tokens = coffee.tokens(this.local.detail.code);
            for (i = _i = 0, _len = tokens.length; _i < _len; i = ++_i) {
              token = tokens[i];
              switch (token[0]) {
                case 'CLASS':
                  if (this.local.detail["class"] == null) {
                    this.local.detail["class"] = tokens[i + 1][1];
                  }
                  break;
                case 'EXTENDS':
                  if (this.local.detail.depends == null) {
                    this.local.detail.depends = tokens[i + 1][1];
                  }
              }
            }
            if (opts.compiler != null) {
              filepath = getFilepath(this.local.detail.file, opts.input);
              if ((opts.docs != null) && (opts.template != null)) {
                generateDoc(code, opts, filepath);
              }
              this.global.filepaths.push(filepath);
            }
            return this.next();
          }
        }