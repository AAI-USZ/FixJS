function(e, ret) {
            if (e && !isSyntaxError(e)) return finish(e);

            if (typeof ret === 'function' || e) {
              // Now as statement without parens.
              self.eval(evalCmd, self.context, 'repl', finish);
            } else {
              finish(null, ret);
            }
          }