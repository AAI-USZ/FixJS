function() {
      var browser, compileOpts, details, node;
      compileOpts = {};
      if (opts.bare) {
        compileOpts.bare = opts.bare;
      }
      if (R_ENV.test(code)) {
        node = code.replace(R_ENV, function(matched, $1, $2, offset, source) {
          if ($2 != null) {
            return $2;
          } else {
            return '';
          }
        });
        node = coffee.compile(node, compileOpts);
        browser = code.replace(R_ENV, function(matched, $1, $2, offset, source) {
          if ($1 != null) {
            return $1;
          } else {
            return '';
          }
        });
        browser = coffee.compile(browser, compileOpts);
        details = [
          {
            path: "node/" + filepath + ".js",
            code: beautify(node)
          }, {
            path: "browser/" + filepath + ".js",
            code: beautify(browser)
          }
        ];
        if (opts.minify) {
          details.push({
            path: "browser/" + filepath + ".min.js",
            code: minify(browser)
          });
        }
        return this.next(details);
      } else {
        try {
          code = coffee.compile(code, compileOpts);
        } catch (err) {
          return error(err.message);
        }
        details = [
          {
            path: "" + filepath + ".js",
            code: beautify(code)
          }
        ];
        if (opts.minify) {
          details.push({
            path: "" + filepath + ".min.js",
            code: minify(code)
          });
        }
        return this.next(details);
      }
    }