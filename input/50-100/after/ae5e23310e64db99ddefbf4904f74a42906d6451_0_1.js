function(e, ret) {
            if (e && !isSyntaxError(e)) return finish(e);

            if (typeof ret === 'function' &&
                /^[\r\n\s]*function/.test(evalCmd) ||
                e) {
              // Now as statement without parens.
              self.eval(evalCmd, self.context, 'repl', finish);
            } else {
              finish(null, ret);
            }
          }