function(offset, line, column, left, right) {
              if(!right) return left;
              var op = constructorLookup[right[1][0]],
                  raw = left.raw + right[0] + right[1][0] + right[2] + right[3].raw;
              return new op(left, right[3]).r(raw).p(line, column);
            }