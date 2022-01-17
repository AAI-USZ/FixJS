f        var b, c, delta, level, newLevel, tok;
        if (!isEnd) {
          this.ss.concat(data);
        }
        while (this.ss.rest().length) {
          switch (this.context.peek()) {
            case null:
            case INDENT:
            case '#{':
            case '[':
            case '(':
            case '{':
              if (this.ss.bol() || this.scan(RegExp("(?:[" + ws + "]*\\n)+"))) {
                while (this.ss.scan(RegExp("(?:[" + ws + "]*(\\#\\#?(?!\\#)[^\\n]*)?\\n)"))) {
                  this.p("\n");
                }
                if (!isEnd && ((this.ss.check(RegExp("[" + ws + "\\n]*$"))) != null)) {
                  return;
                }
                if (this.base != null) {
                  if ((this.scan(this.base)) == null) {
                    throw new Error("inconsistent base indentation");
                  }
                } else {
                  b = this.scan(RegExp("[" + ws + "]*"));
                  this.base = RegExp("" + b);
                }
                if (this.indent != null) {
                  level = ((function() {
                    var _i, _len, _ref, _results;
                    _ref = this.context;
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                      c = _ref[_i];
                      if (c === INDENT) {
                        _results.push(0);
                      }
                    }
                    return _results;
                  }).call(this)).length;
                  if (this.ss.check(RegExp("(?:" + this.indent + "){" + (level + 1) + "}[^" + ws + "#]"))) {
                    this.scan(RegExp("(?:" + this.indent + "){" + (level + 1) + "}"));
                    this.context.observe(INDENT);
                    this.p(INDENT);
                  } else if (level > 0 && this.ss.check(RegExp("(?:" + this.indent + "){0," + (level - 1) + "}[^" + ws + "]"))) {
                    newLevel = 0;
                    while (this.scan(RegExp("" + this.indent))) {
                      ++newLevel;
                    }
                    delta = level - newLevel;
                    while (delta--) {
                      this.context.observe(DEDENT);
                      this.p("" + DEDENT + TERM);
                    }
                  } else if (this.ss.check(RegExp("(?:" + this.indent + "){" + level + "}[^" + ws + "]"))) {
                    this.scan(RegExp("(?:" + this.indent + "){" + level + "}"));
                  } else {
                    throw new Error("invalid indentation");
                  }
                } else if (this.ss.check(RegExp("[" + ws + "]+[^" + ws + "#]"))) {
                  this.indent = this.scan(RegExp("[" + ws + "]+"));
                  this.context.observe(INDENT);
                  this.p(INDENT);
                }
              }
              tok = (function() {
                switch (this.context.peek()) {
                  case '[':
                    this.scan(/[^\n'"\\\/#`[({\]]+/);
                    return this.scan(/\]/);
                  case '(':
                    this.scan(/[^\n'"\\\/#`[({)]+/);
                    return this.scan(/\)/);
                  case '#{':
                  case '{':
                    this.scan(/[^\n'"\\\/#`[({}]+/);
                    return this.scan(/\}/);
                  default:
                    this.scan(/[^\n'"\\\/#`[({]+/);
                    return null;
                }
              }).call(this);
              if (tok) {
                this.context.observe(tok);
                continue;
              }
              if (tok = this.scan(/"""|'''|\/\/\/|###|["'/`[({\\]/)) {
                this.context.observe(tok);
              } else if (this.ss.scan(RegExp("[" + ws + "]*\\#"))) {
                this.context.observe('#');
              }
              break;
            case '\\':
              if ((this.ss.scan(/\n/)) || (this.scan(/./))) {
                this.context.observe('end-\\');
              }
              break;
            case '"""':
              this.scan(/(?:[^"#\\]+|""?(?!")|#(?!{)|\\.)+/);
              this.ss.scan(/\\\n/);
              if (tok = this.scan(/#{|"""/)) {
                this.context.observe(tok);
              } else if (tok = this.scan(/#{|"""/)) {
                this.context.observe(tok);
              }
              break;
            case '"':
              this.scan(/(?:[^"#\\]+|#(?!{)|\\.)+/);
              this.ss.scan(/\\\n/);
              if (tok = this.scan(/#{|"/)) {
                this.context.observe(tok);
              }
              break;
            case '\'\'\'':
              this.scan(/(?:[^'\\]+|''?(?!')|\\.)+/);
              this.ss.scan(/\\\n/);
              if (tok = this.scan(/'''/)) {
                this.context.observe(tok);
              }
              break;
            case '\'':
              this.scan(/(?:[^'\\]+|\\.)+/);
              this.ss.scan(/\\\n/);
              if (tok = this.scan(/'/)) {
                this.context.observe(tok);
              }
              break;
            case '###':
              this.scan(/(?:[^#]+|##?(?!#))+/);
              if (tok = this.scan(/###/)) {
                this.context.observe(tok);
              }
              break;
            case '#':
              this.ss.scan(/[^\n]+/);
              if (tok = this.scan(/\n/)) {
                this.context.observe(tok);
              }
              break;
            case '`':
              this.scan(/[^`]+/);
              if (tok = this.scan(/`/)) {
                this.context.observe(tok);
              }
              break;
            case '///':
              this.scan(/(?:[^[/#\\]+|\/\/?(?!\/)|\\.)+/);
              if (tok = this.scan(/#{|\/\/\/|\\/)) {
                this.context.observe(tok);
              } else if (this.ss.scan(/#/)) {
                this.context.observe('heregexp-#');
              } else if (tok = this.scan(/[\[]/)) {
                this.context.observe("heregexp-" + tok);
              }
              break;
            case 'heregexp-[':
              this.scan(/(?:[^\]\/\\]+|\/\/?(?!\/))+/);
              if (tok = this.scan(/[\]\\]|#{|\/\/\//)) {
                this.context.observe(tok);
              }
              break;
            case 'heregexp-#':
              this.ss.scan(/(?:[^\n/]+|\/\/?(?!\/))+/);
              if (tok = this.scan(/\n|\/\/\//)) {
                this.context.observe(tok);
              }
              break;
            case '/':
              this.scan(/[^[/\\]+/);
              if (tok = this.scan(/[\/\\]/)) {
                this.context.observe(tok);
              } else if (tok = this.scan(/\[/)) {
                this.context.observe("regexp-" + tok);
              }
              break;
            case 'regexp-[':
              this.scan(/[^\]\\]+/);
              if (tok = this.scan(/[\]\\]/)) {
                this.context.observe(tok);
              }
          }
        }
        if (isEnd) {
          this.scan(RegExp("[" + ws + "\\n]*$"));
          while (this.context.length && INDENT === this.context.peek()) {
            this.context.observe(DEDENT);
            this.p("" + DEDENT + TERM);
          }
          if (this.context.length) {
            throw new Error('Unclosed ' + (inspect(this.context.peek())) + ' at EOF');
          }
          this.emit('end');
          return;
        }
        return null;
      };
