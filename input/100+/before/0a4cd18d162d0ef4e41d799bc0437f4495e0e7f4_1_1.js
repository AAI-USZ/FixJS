function(inScope, ancestors) {
          var canDropLast, stmts,
            _this = this;
          canDropLast = !this.usedAsExpression(ancestors);
          stmts = concat((function() {
            var i, s, _i, _len, _ref2, _results;
            _ref2 = _this.statements;
            _results = [];
            for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
              s = _ref2[i];
              switch (false) {
                case !((!s.mayHaveSideEffects(inScope)) && (canDropLast || i + 1 !== _this.statements.length)):
                  _results.push([declarationsFor(s.envEnrichments())]);
                  break;
                case !s["instanceof"](Block):
                  _results.push(s.statements);
                  break;
                case !s["instanceof"](SeqOp):
                  _results.push([s.left, s.right]);
                  break;
                default:
                  _results.push([s]);
              }
            }
            return _results;
          })());
          switch (stmts.length) {
            case 0:
              return (new Undefined).g();
            case 1:
              return stmts[0];
            default:
              return foldl1(stmts, function(expr, s) {
                return new SeqOp(expr, s);
              });
          }
        }