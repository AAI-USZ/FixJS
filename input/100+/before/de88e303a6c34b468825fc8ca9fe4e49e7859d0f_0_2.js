function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = conds.length; _j < _len1; _j++) {
              cond = conds[_j];
              while (cond !== (cond = (fn.call(cond, inScope, ancestry)).walk(fn, inScope, ancestry))) {
                continue;
              }
              _results1.push(inScope = union(inScope, cond.envEnrichments()));
            }
            return _results1;
          }