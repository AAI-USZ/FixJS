function(inScope, ancestors) {
          var canDropLast, changed, newNode, _ref1,
            _this = this;
          canDropLast = (_ref1 = ancestors[0]) != null ? _ref1["instanceof"](Program, Class) : void 0;
          changed = false;
          newNode = new Block(concat((function() {
            var i, s, _i, _len, _ref2, _results;
            _ref2 = _this.statements;
            _results = [];
            for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
              s = _ref2[i];
              if (!((s.mayHaveSideEffects(inScope)) || (!canDropLast && i + 1 === _this.statements.length))) {
                changed = true;
                continue;
              }
              if (s["instanceof"](SeqOp)) {
                changed = true;
                _results.push([s.left, s.right]);
              } else {
                _results.push([s]);
              }
            }
            return _results;
          })()));
          if (!changed) {
            return this;
          }
          switch (newNode.statements.length) {
            case 0:
              if (canDropLast) {
                return newNode;
              } else {
                return (new Undefined).g();
              }
              break;
            case 1:
              return newNode.statements[0];
            default:
              return newNode;
          }
        }