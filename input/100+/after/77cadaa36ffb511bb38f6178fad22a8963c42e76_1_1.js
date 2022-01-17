function() {
          var canDropLast, i, s, _i, _len, _ref1, _ref2, _results;
          canDropLast = ((_ref1 = ancestors[0]) != null ? _ref1.className : void 0) === 'Program';
          _ref2 = _this.statements;
          _results = [];
          for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
            s = _ref2[i];
            if ((!s.mayHaveSideEffects(inScope)) && (canDropLast || i + 1 !== _this.statements.length)) {
              continue;
            }
            _results.push(s);
          }
          return _results;
        }