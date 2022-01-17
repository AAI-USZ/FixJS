function(offset, line, column, left, rights) {
              if(!rights) return left;
              return foldl(function(expr, right){
                var raw = expr.raw + right[0] + right[1] + right[2] + right[3].raw;
                return new constructorLookup[right[1]](expr, right[3]).r(raw).p(line, column);
              }, left, rights);
            }