function(offset, line, column, left, rights) {
              if(!rights) return left;
              return foldl(function(expr, right){
                var raw = left.raw + right[0] + right[1] + right[3] + right[4].raw;
                return new Nodes.BitAndOp(expr, right[4]).r(raw).p(line, column);
              }, left, rights);
            }