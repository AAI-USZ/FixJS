function(offset, line, column, left, right) {
              if(!right) return left;
              var raw = left.raw + right[0] + right[1] + right[2] + right[3].raw;
              return new constructorLookup[right[1]](left, right[3]).r(raw).p(line, column);
            }