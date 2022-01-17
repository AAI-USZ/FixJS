function() {
      if (opts.join != null) {
        return Relay.serial(Relay.func(function(files) {
          this.global.details = [];
          return this.next(files);
        }), Relay.each(Relay.serial(Relay.func(function(file) {
          this.local.detail = {
            file: file
          };
          this.global.details.push(this.local.detail);
          return fs.readFile(this.local.detail.file, "utf8", this.next);
        }), Relay.func(function(err, code) {
          var filepath, i, token, tokens, _len;
          if (err != null) {
            return this.skip();
          } else {
            this.local.detail.code = code;
            tokens = coffee.tokens(this.local.detail.code);
            for (i = 0, _len = tokens.length; i < _len; i++) {
              token = tokens[i];
              switch (token[0]) {
               case "CLASS":
                if (this.local.detail["class"] == null) {
                  this.local.detail["class"] = tokens[i + 1][1];
                }
                break;
               case "EXTENDS":
                if (this.local.detail.depends == null) {
                  this.local.detail.depends = tokens[i + 1][1];
                }
              }
            }
            if (opts.compiler != null) {
              filepath = getFilepath(this.local.detail.file, opts.input);
              if (opts.docs != null && opts.template != null) {
                generateDoc(code, opts, filepath);
              }
              this.global.filepaths.push(filepath);
            }
            return this.next();
          }
        })), true), Relay.func(function() {
          var code, counter, d, detail, details, displace, i, internal, sorted, tmp, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m;
          details = this.global.details;
          for (_i = 0, _len = details.length; _i < _len; _i++) {
            detail = details[_i];
            internal = false;
            for (_j = 0, _len2 = details.length; _j < _len2; _j++) {
              d = details[_j];
              if (d !== detail) {
                if (detail.depends === d["class"]) {
                  internal = true;
                  break;
                }
              }
            }
            if (!internal) detail.depends = null;
          }
          sorted = [];
          counter = 0;
          while (i = details.length) {
            if (counter++ === 100) throw new Error("Can't resolve dependency.");
            tmp = [];
            while (i--) {
              detail = details[i];
              displace = false;
              if (detail.depends == null) {
                displace = true;
              } else {
                for (_k = 0, _len3 = sorted.length; _k < _len3; _k++) {
                  d = sorted[_k];
                  if (detail.depends === d["class"]) {
                    displace = true;
                    break;
                  }
                }
              }
              if (displace) {
                details.splice(i, 1);
                tmp.push(detail);
              }
            }
            tmp.reverse();
            sorted = sorted.concat(tmp);
          }
          details = sorted;
          code = "";
          if (opts.bare != null) {
            for (_l = 0, _len4 = details.length; _l < _len4; _l++) {
              detail = details[_l];
              code += detail.code;
            }
          } else {
            for (_m = 0, _len5 = details.length; _m < _len5; _m++) {
              detail = details[_m];
              code += "" + detail.code + "\n";
            }
          }
          return compile(code, opts, opts.join, this.next);
        }));
      } else {
        return Relay.each(Relay.serial(Relay.func(function(file) {
          this.local.path = getFilepath(file, opts.input);
          return fs.readFile(file, "utf8", this.next);
        }), Relay.func(function(err, code) {
          if (err != null) {
            return this.skip();
          } else {
            compile(code, opts, this.local.path, this.next);
            if (opts.compiler != null) {
              if (opts.docs != null && opts.template != null) {
                generateDoc(code, opts, this.local.path);
              }
              return this.global.filepaths.push(this.local.path);
            }
          }
        })));
      }
    }